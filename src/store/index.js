import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import io from 'socket.io-client';

// Async action creator using createAsyncThunk
export const initSocket = createAsyncThunk('INIT_SOCKET', async () => {
  const socket = io('http://localhost:3001', { transports: ['websocket'] });

  // Perform any necessary initialization logic here

  return socket;
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
