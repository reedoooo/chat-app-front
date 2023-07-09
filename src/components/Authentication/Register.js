// Register Component
import { useState, useContext, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { UserContext } from '../../context/hooks/user';

const Register = ({
  handleToggleView,
  handleRegister,
  error,
  headingColor,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    handleRegister(formData);
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
        Register
      </Heading>
      <form onSubmit={onSubmit}>
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
      {error && <Text color='red.500'>{error}</Text>}
      <Button variant='link' onClick={handleToggleView}>
        Already have an account? Login here.
      </Button>
    </VStack>
  );
};

export default Register;
