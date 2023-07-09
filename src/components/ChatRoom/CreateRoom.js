import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createChatRoom,
  addRoomToState,
  addUserToRoom,
  removeUserFromRoom,
  deleteRoomFromState,
  getSocket,
} from '../../actions/chatActions';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Spinner,
  useToast,
} from '@chakra-ui/react';

const CreateRoom = ({ isOpen, onClose, onOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    type: 'public',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNewRoomChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewRoomSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const actionResult = await dispatch(createChatRoom(newRoom));
      const createdRoom = actionResult.payload;
      const socket = dispatch(getSocket());

      socket.on('NEW_ROOM_CREATED', (room) => {
        dispatch(addRoomToState(room));
        onOpen();
      });

      socket.on('ROOM_JOINED', (room) => {
        dispatch(addUserToRoom(room));
      });

      socket.on('ROOM_LEFT', (room) => {
        dispatch(removeUserFromRoom(room));
      });

      socket.on('ROOM_DELETED', (room) => {
        dispatch(deleteRoomFromState(room));
      });

      if (createdRoom && socket) {
        socket.emit('room.updated', createdRoom);
        navigate(`/chatRooms/${createdRoom.id}`);
      }
      onClose();
      toast({
        title: 'Room created.',
        description: `You have created a new room: ${newRoom.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewRoom({
        name: '',
        description: '',
        type: 'public',
      });
    } catch (err) {
      console.error('Error creating new room:', err);
      toast({
        title: 'Error creating room.',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new chat room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              name='name'
              value={newRoom.name}
              onChange={handleNewRoomChange}
              placeholder='Room name'
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name='description'
              value={newRoom.description}
              onChange={handleNewRoomChange}
              placeholder='Room description'
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Room Type</FormLabel>
            <Select
              name='type'
              value={newRoom.type}
              onChange={handleNewRoomChange}
            >
              <option value='public'>Public</option>
              <option value='private'>Private</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={handleNewRoomSubmit}>
            {isLoading ? <Spinner /> : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoom;
