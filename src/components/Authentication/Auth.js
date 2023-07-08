import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserProvider } from '../../context/hooks/user';
import { loginUser, registerUser } from '../../actions/authActions';
import Login from './Login';
import Register from './Register';
import {
  Flex,
  Button,
  useColorModeValue,
  Heading,
  Text,
} from '@chakra-ui/react';


function Auth() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const socket = useSelector((state) => state.chatRoom.socket);
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null);

  // const [user, setUser] = useState(
  //   Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  // );

  // Log the user state
  console.log(user);
  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null); // Reset the error message on view toggle
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      socket.emit('login', response.user);
      setUser(response.user);
      navigate('/rooms');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const response = await registerUser(credentials);
      setUser(response.user);
      navigate('/rooms');
    } catch (error) {
      setError('Failed to register. Please check your information.');
    }
  };

  const buttonColor = useColorModeValue('gray.300', 'gray.700');
  const headingColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <UserProvider>
      <Flex
        direction='column'
        justify='center'
        align='center'
        h='100vh'
        bg={buttonColor}
      >
        {isLoginView ? (
          <Flex direction='column' align='center' justify='center'>
            <Heading mb={4} color={headingColor}>
              Login
            </Heading>
            <Login onLogin={handleLogin} />
            {error && <Text color='red.500'>{error}</Text>}
            <Button variant='link' onClick={handleToggleView}>
              Don&#39;t have an account? Register here.
            </Button>
          </Flex>
        ) : (
          <Flex direction='column' align='center' justify='center'>
            <Heading mb={4} color={headingColor}>
              Register
            </Heading>
            <Register onRegister={handleRegister} />
            {error && <Text color='red.500'>{error}</Text>}
            <Button variant='link' onClick={handleToggleView}>
              Already have an account? Login here.
            </Button>
          </Flex>
        )}
      </Flex>
    </UserProvider>
  );
}

export default Auth;
