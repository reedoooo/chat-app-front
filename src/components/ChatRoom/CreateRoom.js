import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChatRoom } from '../../actions/chatRoomActions';
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
import { getSocket } from '../../actions/chatRoomActions';

const CreateRoom = ({ isOpen, onClose, onOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const newRoomData = useSelector((state) => state.chat.newRoom);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [newRoom, setNewRoom] = useState(
    newRoomData || {
      name: '',
      color: 'light',
      description: '',
      users: user ? [user._id] : [],
      messages: [],
      createdAt: new Date(),
      createdBy: user ? user._id : null,
    },
  );

  const handleNewRoomChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleNewRoomSubmit = async (e) => {
    e.preventDefault();

    if (!newRoom.name || !newRoom.description) {
      toast({
        title: 'Validation Error',
        description: 'Name and description fields cannot be empty.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const actionResult = await dispatch(createChatRoom(newRoom));
      const createdRoom = actionResult.payload;

      const socket = dispatch(getSocket());

      if (createdRoom && socket) {
        socket.emit('room.updated', createdRoom);
        navigate(`/chatRooms/${createdRoom.id}`);
      }

      setNewRoom({ name: '', color: 'light', description: '' });
      onClose();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to create room. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setNewRoom(newRoomData || { name: '', color: 'light', description: '' });
  }, [newRoomData]);

  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Create Room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleNewRoomSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Room Name:</FormLabel>
                <Input
                  type='text'
                  name='name'
                  value={newRoom.name}
                  onChange={handleNewRoomChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Color:</FormLabel>
                <Select
                  name='color'
                  value={newRoom.color}
                  onChange={handleNewRoomChange}
                >
                  <option value='light'>Light</option>
                  <option value='dark'>Dark</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  name='description'
                  value={newRoom.description}
                  onChange={handleNewRoomChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                type='submit'
                isLoading={isLoading}
              >
                {isLoading ? <Spinner /> : 'Create'}
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRoom;
