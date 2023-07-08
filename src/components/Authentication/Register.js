import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  GridItem,
  useColorModeValue,
  Heading,
  HStack,
} from '@chakra-ui/react';

import axios from 'axios';
import { createChatRoom, deleteChatRoom } from '../../actions/chatRoomActions';
import { UserContext, UserProvider } from '../../context/hooks/user';
import { RoomContext } from '../../context/hooks/room';
import { useNavigate } from 'react-router-dom';

const Register = ({ props }) => {
  const REACT_APP_SOCKET = process.env.REACT_APP_SOCKET;
  const dispatch = useDispatch();
  const { setUser } = useContext(UserContext);
  const { setRoom } = useContext(RoomContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_SOCKET}/chatRooms`)
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${REACT_APP_SOCKET}/users/register`,
        formData,
      );

      setUser(response.data.user);
      console.log('response.data.user', response);
      // Get room data for the user
      const roomResponse = await axios.get(
        `${REACT_APP_SOCKET}/chatRooms/${response.data.user.id}`,
      );

      console.log('roomResponse', roomResponse.data);

      // Update the room context
      setRoom(roomResponse.data);

      navigate('/rooms');
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <UserProvider>
      <HStack spacing={8} align='start'>
        <VStack
          spacing={4}
          p={5}
          w='400px'
          borderRadius='lg'
          boxShadow='lg'
          // mx='auto'
          bg={useColorModeValue('white', 'gray.800')}
        >
          <form onSubmit={handleSubmit}>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <GridItem colSpan={2}>
                <FormControl id='name' isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='name'
                    name='name'
                    onChange={handleChange}
                    value={formData.name}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl id='email' isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl id='username' isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type='text'
                    name='username'
                    onChange={handleChange}
                    value={formData.username}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl id='password' isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <Button type='submit' colorScheme='purple' w='full' mt={4}>
                  Register
                </Button>
              </GridItem>
            </Grid>
          </form>
          {/* <Button variant='link' onClick={props.onRegister} colorScheme='purple'>
          Already have an account? Login here.
        </Button> */}
        </VStack>
        <VStack
          spacing={4}
          p={5}
          w='400px'
          borderRadius='lg'
          boxShadow='lg'
          bg={useColorModeValue('white', 'gray.800')}
        >
          <Heading size='lg'>Rooms</Heading>
          {rooms.map((room) => (
            <HStack key={room._id}>
              <Button
                colorScheme='red'
                onClick={() => {
                  dispatch(deleteChatRoom(room._id));
                }}
              >
                Delete
              </Button>
              <Button
                colorScheme='green'
                onClick={() => {
                  dispatch(createChatRoom(room.name));
                }}
              >
                {room.name}
              </Button>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </UserProvider>
  );
};

export default Register;
