import { createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';

// Async action creator using createAsyncThunk
export const initSocket = createAsyncThunk(
  'INIT_SOCKET',
  async (_, { getState }) => {
    return new Promise((resolve) => {
      const socket = io('http://localhost:3001', { transports: ['websocket'] });

      // Perform any necessary initialization logic here

      socket.on('connect', () => {
        // Store the socket reference in the Redux state
        resolve(socket);
      });

      // Handle any socket connection errors or other eventsa
      socket.on('connect_error', (error) => {
        // Handle connection error
        console.error('Socket connection error:', error);
      });
    });
  },
);

// actions/authActions.js
export const login = (user) => ({
  type: 'auth/LOGIN',
  payload: user,
});


// Log out action
export const logout = () => ({
  type: 'auth/LOGOUT',
});

// Set user action
export const setUser = (user) => ({
  type: 'auth/SET_USER',
  payload: user,
});
