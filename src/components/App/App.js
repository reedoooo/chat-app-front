import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Center,
  Collapse,
  Select,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Input,
  Button,
  Grid,
  Icon,
} from '@chakra-ui/react';
import { initSocket, logout, login } from '../../actions/authActions';
import { joinRoom, leaveRoom } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

import {
  createRoom, // Instead of roomCreated
  roomSelected,
  roomDeleted,
} from '../../actions/roomActions';

import { AiOutlineNumber } from 'react-icons/ai';
import Login from '../Authentication/Login';

const eventPool = {
  USER_JOINED: 'USER_JOINED',
  LEAVE_ROOM: 'LEAVE_ROOM',
  SEND_MESSAGE: 'SEND_MESSAGE',
  DISCONNECT: 'DISCONNECT',
  // ROOM_CREATED: 'ROOM_CREATED',
  ROOM_SELECTED: 'ROOM_SELECTED',
  ROOM_DELETED: 'ROOM_DELETED',
  JOINED_ROOM: 'JOINED_ROOM',
  USER_LEFT: 'USER_LEFT',
  USER_REGISTERED: 'USER_REGISTERED',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  CREATE_ROOM_ERROR: 'CREATE_ROOM_ERROR',
  JOIN_ROOM_ERROR: 'JOIN_ROOM_ERROR',
  LEAVE_ROOM_ERROR: 'LEAVE_ROOM_ERROR',
  SEND_MESSAGE_ERROR: 'SEND_MESSAGE_ERROR',
};

const App = () => {
  // Redux hooks for dispatching actions and accessing state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rooms = useSelector((state) => state.room.rooms);
  console.log(rooms);
  const selectedRoom = useSelector((state) => state.room.selectedRoom);
  console.log(selectedRoom);
  // Socket.IO connection and user states
  const socket = useSelector((state) => state.socket);
  const user = useSelector((state) => state.user);

  // State for handling room ID input
  const [roomIdToJoin, setRoomIdToJoin] = useState('');
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    color: 'light', // default to light mode
    description: '',
  });
  console.log(newRoom);

  const handleNewRoomChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };
  const handleNewRoomSubmit = () => {
    console.log('trying to handle now');
    console.log(socket);
    // if (socket) {
    console.log('Creating room...');
    console.log(newRoom);
    dispatch(createRoom(newRoom)); // Use the action here
    // Reset form fields and close accordion
    setNewRoom({ name: '', color: 'light', description: '' });
    setIsCreateRoomOpen(false);
    // }
  };

  const handleCreateRoom = () => {
    console.log('clicked');
    setIsCreateRoomOpen(!isCreateRoomOpen);
  };

  useEffect(() => {
    if (!socket) {
      // Initialize Socket.IO connection if it doesn't exist
      dispatch(initSocket());
    } else {
      // Event listeners for Socket.IO events
      socket.on(eventPool.CONNECT, () => {
        console.log('Connected to socket.io server');
      });

      socket.on(eventPool.ROOM_CREATED, (newRoom) => {
        console.log('New room created:', newRoom);
        dispatch(createRoom(newRoom)); // Changed from roomCreated
      });
      socket.on(eventPool.CREATE_ROOM_ERROR, (errorMsg) => {
        console.log('Error creating room:', errorMsg);
      });
      socket.on(eventPool.USER_JOINED, (roomId) => {
        console.log('Successfully joined room:', roomId);
        dispatch(roomSelected(roomId));
      });
      socket.on(eventPool.JOIN_ROOM_ERROR, (errorMsg) => {
        console.log('Error joining room:', errorMsg);
      });


      socket.on(eventPool.USER_LEFT, (roomId) => {
        console.log('User left room:', roomId);
        // You might want to dispatch an action here to remove the user from the room.
      });

      return () => {
        // Cleanup event listeners when the component unmounts
        socket.off(eventPool.CONNECT);
        socket.off(eventPool.USER_JOINED);
        socket.off(eventPool.ROOM_CREATED);
        socket.off(eventPool.USER_LEFT);
      };
    }
  }, [socket, dispatch]);

  // Event handler for leaving a room
  const handleLeaveRoom = () => {
    if (selectedRoom) {
      dispatch(leaveRoom(selectedRoom));
      if (socket) {
        console.log('Emitting leave room event from client side');
        socket.emit('USER_LEFT', selectedRoom);
      }
    }
  };

  // Event handler for joining a room
  const handleJoinRoom = (roomId) => {
    dispatch(joinRoom(roomId));
    if (socket) {
      console.log('Emitting join room event from client side');
      socket.emit('USER_JOINED', roomId);
    }
    setRoomIdToJoin('');
  };

  // Event handler for logging out
  const handleLogout = () => {
    dispatch(logout());
  };

  // Event handler for logging in
  const handleLogin = (user) => {
    dispatch(login(user));
  };

  // Event handler for selecting a room
  const selectRoom = (roomId) => {
    setRoomIdToJoin(roomId);
  };

  return (
    <Center h="100vh">
      <Box
        position="fixed"
        top={4}
        left={4}
        p={4}
        borderRadius="sm"
        boxShadow="md"
        bg="white"
        fontWeight="bold"
      >
        {selectedRoom ? (
          <div>
            You are in room {selectedRoom}
            <Button colorScheme="red" onClick={handleLeaveRoom}>
              Leave Room
            </Button>
          </div>
        ) : (
          <div>Select a room to join</div>
        )}
      </Box>
      <VStack spacing={6}>
        <Box w="500px" p={4} bg="white" boxShadow="md" rounded="md">
          <VStack spacing={4} align="stretch">
            <Heading size="lg">Chat Rooms</Heading>
            <Input
              type="text"
              value={roomIdToJoin}
              onChange={(e) => setRoomIdToJoin(e.target.value)}
              placeholder="Room ID to join..."
            />
            <Button
              colorScheme="blue"
              onClick={() => handleJoinRoom(roomIdToJoin)}
            >
              Join Room
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleLeaveRoom(selectedRoom)}
            >
              Leave Room
            </Button>

            {user ? (
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </VStack>
        </Box>

        <Box w="375px" h="150px" p={4} bg="gray.50" boxShadow="md" rounded="md">
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {rooms.slice(0, 8).map((roomId) => (
              <Box
                key={roomId}
                bg="white"
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                onClick={() => selectRoom(roomId)}
                _hover={{ cursor: 'pointer', bg: 'gray.100' }}
              >
                <Icon as={AiOutlineNumber} w={6} h={6} />
              </Box>
            ))}
          </Grid>
        </Box>
        <Button colorScheme="green" onClick={handleCreateRoom}>
          Create Room
        </Button>
        <Collapse in={true}>
          <Box
            w="375px"
            p={4}
            bg={newRoom.color === 'light' ? 'white' : 'gray.800'}
            boxShadow="md"
            rounded="md"
            color={newRoom.color === 'light' ? 'black' : 'white'}
          >
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={newRoom.name}
                  onChange={handleNewRoomChange}
                  placeholder="Room Name..."
                />
              </FormControl>
              <FormControl>
                <FormLabel>Color Mode</FormLabel>
                <Select
                  name="color"
                  value={newRoom.color}
                  onChange={handleNewRoomChange}
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={newRoom.description}
                  onChange={handleNewRoomChange}
                  placeholder="Room Description..."
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleNewRoomSubmit}>
                Submit
              </Button>
            </VStack>
          </Box>
        </Collapse>
      </VStack>
    </Center>
  );
};

export default App;
