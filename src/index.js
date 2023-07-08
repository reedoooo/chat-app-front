import { useContext, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from './theme';
import { Box, Flex } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import Sidebar from './components/SideBar';
import Settings from './components/Settings';
import Friends from './components/Friends';
import Forum from './components/Forum';
import Main from './components/Main';
import Profile from './components/Profile/Profile';
import Auth from './components/Authentication/Auth';
import Register from './components/Authentication/Register';
import ChatRoom from './components/ChatRoom/ChatRoom';
import store from './store/index.js';
import { UserContext, UserProvider } from './context/hooks/user';
import { RoomContext, RoomProvider } from './context/hooks/room';
import { loadUser, logout } from './actions/authActions';
import { loadRooms, loadMessages, setSocket } from './actions/chatRoomActions';
import io from 'socket.io-client';
import { Button } from '@chakra-ui/react';

const socket = io(process.env.REACT_APP_SOCKET || 'http://localhost:3002');

socket.on('connect_error', (err) => {
  console.log(`Connection Error: ${err.message}`);
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element');
const root = createRoot(rootElement);

const RootComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logoutUser } = useContext(UserContext);
  const { rooms, addRoom, removeRoom } = useContext(RoomContext);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadRooms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadMessages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSocket(socket));
  }, [dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box w='100%' h='100vh' overflow='hidden'>
          <Button onClick={onOpen}>Open Menu</Button>
          <Sidebar isOpen={isOpen} onClose={onClose} />
          <Flex direction='column' p={5} overflowY='scroll' w='100%'>
            <Routes>
              <Route path='/auth/*' element={<Auth addRoom={addRoom} />} />
              <Route path='/register' element={<Register rooms={rooms} />} />
              <Route
                path='/'
                element={
                  user ? <Navigate to='/rooms' /> : <Navigate to='/auth' />
                }
              />
              <Route
                path='/main'
                element={
                  user ? (
                    <Main
                      addRoom={addRoom}
                      removeRoom={removeRoom}
                      rooms={rooms}
                    />
                  ) : (
                    <Navigate to='/auth' />
                  )
                }
              />
              <Route
                path='/rooms'
                element={
                  user ? (
                    <ChatRoom
                      addRoom={addRoom}
                      removeRoom={removeRoom}
                      handleLogout={handleLogout}
                    />
                  ) : (
                    <Navigate to='/auth' />
                  )
                }
              />
              <Route
                path='/settings'
                element={user ? <Settings /> : <Navigate to='/auth' />}
              />
              <Route
                path='/rooms'
                element={user ? <ChatRoom /> : <Navigate to='/auth' />}
              />
              <Route
                path='/profile/*'
                element={user ? <Profile /> : <Navigate to='/auth' />}
              />
              <Route
                path='/friends'
                element={user ? <Friends /> : <Navigate to='/auth' />}
              />
              <Route
                path='/forum'
                element={user ? <Forum /> : <Navigate to='/auth' />}
              />
              <Route path='/*' element={<Navigate to='/auth' />} />
            </Routes>
          </Flex>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <RoomProvider>
          <RootComponent />
        </RoomProvider>
      </UserProvider>
    </Provider>
  );
}

root.render(<App />);

export default App;
