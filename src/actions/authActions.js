import axios from 'axios';
import Cookies from 'js-cookie';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import store from '../store'; // Update this path to match your actual store path
import { io } from 'socket.io-client';

export const initSocket = createAsyncThunk('auth/initSocket', async () => {
  const socket = io('http://localhost:3002', { transports: ['websocket'] });
  return socket;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUserInfo) => {
    const res = await axios.post('/api/auth/register', newUserInfo);

    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('register_user', newUserInfo);
    }

    return res.data;
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', user);
      const data = response.data;

      if (
        response.status === 200 &&
        data.message === 'Logged in successfully'
      ) {
        Cookies.set('token', data.token);
        Cookies.set('userId', data.user._id);

        const { socket } = store.getState().auth;
        if (socket) {
          socket.emit('login_user', user);
        }

        return data;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  const res = await axios.post('/api/auth/logout');

  const { socket } = store.getState().auth;
  if (socket) {
    socket.emit('logout');
  }

  return res.data;
});

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (user, { rejectWithValue }) => {
    if (!user) {
      console.warn('Missing userId. Please check your code.');
      return null;
    }

    const response = await axios.get(`/api/auth/user/${user._id}`);
    const userData = await response.data;
    console.log('userData', userData);

    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('load_user', user);
    }

    return userData;
  },
);

export const removeUser = createAction('auth/removeUser');

export const updateUser = createAsyncThunk('auth/updateUser', async (user) => {
  const res = await axios.put('/api/auth/user/id', user);

  const { socket } = store.getState().auth;
  if (socket) {
    socket.emit('update_user', user);
  }

  return res.data;
});
