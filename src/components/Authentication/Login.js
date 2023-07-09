// Login Component
import { useState, useContext, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { UserContext } from '../../context/hooks/user';

const Login = ({ handleToggleView, handleLogin, error, headingColor }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = (event) => {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };

    handleLogin(credentials);
  };

  return (
    <VStack
      spacing={4}
      p={5}
      w='400px'
      borderRadius='lg'
      boxShadow='lg'
      mx='auto'
      bg='white'
    >
      <Heading mb={4} color={headingColor}>
        Login
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl id='username' isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type='submit' colorScheme='purple' w='full' mt={4}>
          Log In
        </Button>
      </form>
      {error && <Text color='red.500'>{error}</Text>}
      <Button variant='link' onClick={handleToggleView}>
        Dont have an account? Register here.
      </Button>
    </VStack>
  );
};

export default Login;
