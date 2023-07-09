import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRoom,
  setUserTyping,
  loadMessages,
  addNotification,
  sendMessage,
  loadRooms,
  receiveMessage,
} from '../../actions/chatActions';

import { debounce } from 'lodash';
import io from 'socket.io-client';
import Message from '../Message/Message';
import ChatInput from '../ChatInput/ChatInput';
import CreateRoom from './CreateRoom';
import {
  useDisclosure,
  Box,
  Heading,
  Flex,
  Input,
  Button,
  Text,
} from '@chakra-ui/react';
import { UserProvider } from '../../context/hooks/user';

const ChatRooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const currentRoom = useSelector((state) => state.chatRoom.currentRoom);
  const isUserTyping = useSelector((state) => state.chatRoom.isUserTyping);
  const messages = useSelector(
    (state) => state.chatRoom.rooms[currentRoom] || [],
  );
  const [selectedRoom, setSelectedRoom] = useState('');
  const [messageText, setMessageText] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    dispatch(loadRooms());

    socketRef.current.on('notification', (notification) => {
      console.log('Received notification:', notification);
      dispatch(addNotification(notification));
    });

    socketRef.current.on('RECEIVE_MESSAGE', function (message) {
      console.log('New message received:', message);
      dispatch(receiveMessage({ message, roomId: currentRoom }));
    });

    return () => {
      console.log('Component unmount, disconnecting socket');
      socketRef.current.disconnect();
    };
  }, [onOpen, dispatch]);

  const handleUserTyping = debounce(() => {
    console.log('User typing');
    dispatch(setUserTyping(true));
  }, 300);

  const handleRoomChange = (event) => {
    console.log('Room change');
    event.preventDefault();
    dispatch(selectRoom(selectedRoom));
  };

  useEffect(() => {
    console.log('Second useEffect execution, reloading messages');
    dispatch(loadMessages());
  }, [dispatch, currentRoom]);

  const handleSendMessage = (text) => {
    console.log('Sending message');
    const currentUser = 'testUser';
    dispatch(sendMessage({ text, roomId: currentRoom, user: currentUser }));
    socketRef.current.emit('SEND_MESSAGE', currentRoom, {
      text,
      roomId: currentRoom,
      user: currentUser,
    });
  };

  const handleInputChange = (event) => {
    console.log('Input change');
    setMessageText(event.target.value);
    dispatch(setUserTyping(true));
  };

  const handleInputSubmit = (event) => {
    console.log('Submit input');
    event.preventDefault();
    handleSendMessage(messageText);
    setMessageText('');
  };

  const handleRoomClick = (room) => {
    console.log('Room click');
    setSelectedRoom(room);
  };

  return (
    <UserProvider>
      <Box>
        <Heading as='h1' mb={4}>
          Welcome to the Chat!
        </Heading>
        <CreateRoom isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        {rooms.map((room) => (
          <Text key={room.id} onClick={() => handleRoomClick(room.id)}>
            {room.name}
          </Text>
        ))}
        {currentRoom && (
          <>
            <Heading as='h2' mb={4}>
              {currentRoom}
            </Heading>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <ChatInput
              messageText={messageText}
              handleInputChange={handleInputChange}
              handleInputSubmit={handleInputSubmit}
              onUserTyping={handleUserTyping}
            />
          </>
        )}
        <Flex as='form' onSubmit={handleRoomChange}>
          <Input
            type='text'
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            placeholder='Enter room id...'
          />
          <Button type='submit' colorScheme='blue'>
            Change Room
          </Button>
        </Flex>
        {isUserTyping && <Text>A user is typing...</Text>}
      </Box>
    </UserProvider>
  );
};

export default ChatRooms;
