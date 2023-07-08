import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { UserProvider } from '../../context/hooks/user';
import { useColorModeValue } from '@chakra-ui/react';

const Login = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [user, setUser] = useState(
  //   Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  // );
  
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
      // Create a form data object
      username,
      password,
    };

    try {
      await dispatch(loginUser(formData)); // Pass the form data object to the loginUser action
      navigate('/rooms');
    } catch (error) {
      // Handle error
    }
  };

  const buttonColor = useColorModeValue('purple.500', 'purple.200');

  return (
    <UserProvider>
      <VStack
        spacing={4}
        p={5}
        w='400px'
        borderRadius='lg'
        boxShadow='lg'
        mx='auto'
        bg={useColorModeValue('white', 'gray.800')}
      >
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
          <Button
            colorScheme='purple'
            bg={buttonColor}
            type='submit'
            w='full'
            mt={4}
          >
            Log In
          </Button>
        </form>
        {/* <Button variant='link' onClick={props.onLogin} colorScheme='purple'>
          Don&apos;t have an account? Sign up here.
        </Button> */}
      </VStack>
    </UserProvider>
  );
};

export default Login;

// import { useState } from 'react';
// import {
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Box,
//   VStack,
//   Heading,
// } from '@chakra-ui/react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../../actions/authActions';
// import { UserProvider } from '../../context/hooks/user';
// // import withAuthRedirect from '../../HOC';

// const Login = (props) => {
//   const dispatch = useDispatch();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const navigate = useNavigate();

//   const onSubmit = async (formData) => {
//     try {
//       await dispatch(loginUser(formData));
//       // If loginUser action resolved successfully,
//       // navigate the user to the /rooms page.
//       navigate('/rooms');
//     } catch (error) {
//       // Handle error
//     }
//   };

//   return (
//     <UserProvider>
//       <VStack
//         spacing={4}
//         p={5}
//         w='400px'
//         border='1px'
//         borderRadius='lg'
//         boxShadow='lg'
//         mx='auto'
//         mt='100px'
//       >
//         <Heading>Login</Heading>
//         <form onSubmit={onSubmit}>
//           <FormControl id='username' my={4}>
//             <FormLabel>Username</FormLabel>
//             <Input
//               type='text'
//               placeholder='Username'
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </FormControl>
//           <FormControl id='password' my={4}>
//             <FormLabel>Password</FormLabel>
//             <Input
//               type='password'
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </FormControl>
//           <Box textAlign='center'>
//             <Button colorScheme='teal' type='submit'>
//               Log In
//             </Button>
//           </Box>
//         </form>
//         <Link>
//           <Box textAlign='center' mt={2}>
//             <p>Don&apos;t have an account?</p>
//             <Button onClick={props.onShowRegister}>Sign up here.</Button>
//           </Box>
//         </Link>
//       </VStack>
//     </UserProvider>
//   );
// };

// export default Login;

// // export default withAuthRedirect(Login);
