// Auth Component
import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/hooks/user';
import { loginUser, registerUser } from '../../actions/authActions';
import Login from './Login';
import Register from './Register';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import ChatRooms from '../ChatRoom/ChatRooms';
import { RoomContext } from '../../context/hooks/room';

function Auth() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { room, setRoom } = useContext(RoomContext);
  const socket = useSelector((state) => state.chatRoom.socket);
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('login', (user) => {
        setUser(user);
      });

      socket.on('user.loggedin', (room) => {
        setRoom(room);
      });

      socket.on('register', (user) => {
        setUser(user);
      });

      socket.on('user.registered', (room) => {
        setRoom(room);
      });
      console.log(room);

      return () => {
        socket.off('login');
        socket.off('register');
      };
    }
  }, [socket, setUser]);

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
  };
  const dispatch = useDispatch(); // Don't forget to import it from react-redux

  const handleLogin = async (credentials) => {
    try {
      const response = await dispatch(loginUser(credentials)); // Wrap loginUser call with dispatch
      socket.emit('login', response.user);
      setUser(response.user);
      navigate('/rooms');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const response = await dispatch(registerUser(credentials)); // Wrap registerUser call with dispatch
      setUser(response.user);
      navigate('/rooms');
    } catch (error) {
      setError('Failed to register. Please check your information.');
    }
  };

  const buttonColor = useColorModeValue('gray.300', 'gray.700');
  const headingColor = useColorModeValue('gray.600', 'gray.400');

  if (user) {
    return <ChatRooms />;
  }

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      h='100vh'
      bg={buttonColor}
    >
      {isLoginView ? (
        <Login
          handleToggleView={handleToggleView}
          handleLogin={handleLogin}
          error={error}
          headingColor={headingColor}
        />
      ) : (
        <Register
          handleToggleView={handleToggleView}
          handleRegister={handleRegister}
          error={error}
          headingColor={headingColor}
        />
      )}
    </Flex>
  );
}

export default Auth;
