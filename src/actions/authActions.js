import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import { setSocket } from './chatRoomActions';
import Cookies from 'js-cookie';

export const initSocket = createAsyncThunk(
  'INIT_SOCKET',
  async (_, { dispatch, getState }) => {
    return new Promise((resolve) => {
      const socket = io('http://localhost:3002', { transports: ['websocket'] });

      // Client-side code using socket.io
      // socket.on('NEW_ROOM_CREATED', function (room) {
      //   console.log('NEW_ROOM_CREATED', room);
      //   dispatch(createChatRoom(room));
      // });

      socket.on('USER_REGISTERED', (user) => {
        dispatch(loadUser(user));
      });

      // Listen to the 'user.login' event
      socket.on('USER_LOGGED_IN', (user) => {
        dispatch(loadUser(user));
      });

      socket.on('connect', () => {
        dispatch(setSocket(socket));
        resolve(socket);
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    });
  },
);


export const loadUser = createAsyncThunk(
  'LOAD_USER',
  async (user, { dispatch, getState }) => {
    console.log('userId', user);
    if (!user) {
      console.warn('Missing userId. Please check your code.');
      return null;
    }
    const response = await fetch(`http://localhost:3002/users/${user._id}`);
    const userData = await response.json();
    console.log('userData', userData);
    dispatch(setUser(userData));
    return userData;
  },
);

export const loginUser = createAsyncThunk('auth/LOGIN', async (user) => {
  const response = await fetch(`http://localhost:3002/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log('data', data);

  if (response.ok && data.message === 'Logged in successfully') {
    const uuid = uuidv4(); // Generate UUID for user
    Cookies.set('token', data.token); // Save the token into the cookies
    Cookies.set('userId', uuid); // Save the UUID into the cookies
  } else {
    throw new Error(data.error || 'Login failed');
  }

  return data;
});

export const registerUser = createAsyncThunk(
  'auth/REGISTER',
  async (user, { dispatch, getState }) => {
    const response = await fetch(`http://localhost:3002/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, _id: uuidv4() }), // Generate UUID for user and include in request
    });

    const data = await response.json();
    console.log('data', data);
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  },
);

export const logout = () => ({
  type: 'auth/LOGOUT',
});

export const setUser = (user) => ({
  type: 'auth/SET_USER',
  payload: user,
});

// import { v4 as uuidv4 } from 'uuid';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import io from 'socket.io-client';
// import { setSocket } from './chatRoomActions';
// import Cookies from 'js-cookie';

// export const initSocket = createAsyncThunk(
//   'INIT_SOCKET',
//   async (_, { dispatch, getState }) => {
//     return new Promise((resolve) => {
//       const socket = io('http://localhost:3002', { transports: ['websocket'] });

//       // Listen to the 'user.login' event
//       socket.on('user.login', (user) => {
//         dispatch(loadUser(user));
//       });

//       socket.on('connect', () => {
//         dispatch(setSocket(socket));
//         resolve(socket);
//       });

//       socket.on('connect_error', (error) => {
//         console.error('Socket connection error:', error);
//       });
//     });
//   },
// );

// export const loadUser = createAsyncThunk(
//   'LOAD_USER',
//   async (user, { dispatch, getState }) => {
//     console.log('userId', user);
//     if (!user) {
//       console.warn('Missing userId. Please check your code.');
//       return null;
//     }
//     const response = await fetch(`http://localhost:3002/users/${user._id}`);
//     const userData = await response.json();
//     return userData;
//   },
// );

// export const loadRooms = createAsyncThunk(
//   'LOAD_ROOMS',
//   async (_, { dispatch, getState }) => {
//     const response = await fetch('http://localhost:3002/chatRooms/chatRooms');
//     const rooms = await response.json();
//     return rooms;
//   },
// );

// export const loginUser = createAsyncThunk('auth/LOGIN', async (user) => {
//   const response = await fetch(`http://localhost:3002/users/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });

//   const data = await response.json();

//   if (response.ok && data.message === 'Logged in successfully') {
//     const uuid = uuidv4(); // Generate UUID for user
//     Cookies.set('token', data.token); // Save the token into the cookies
//     Cookies.set('userId', uuid); // Save the UUID into the cookies
//   } else {
//     throw new Error(data.error || 'Login failed');
//   }

//   return data;
// });

// export const registerUser = createAsyncThunk(
//   'auth/REGISTER',
//   async (user, { dispatch, getState }) => {
//     const response = await fetch(`http://localhost:3002/users/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ...user, _id: uuidv4() }), // Generate UUID for user and include in request
//     });

//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     } else {
//       throw new Error(data.error);
//     }
//   },
// );

// export const logout = () => ({
//   type: 'auth/LOGOUT',
// });

// export const setUser = (user) => ({
//   type: 'auth/SET_USER',
//   payload: user,
// });
