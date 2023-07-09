import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import store from '../store'; // Update this path to match your actual store path

export const getChatRooms = createAsyncThunk('rooms/getChatRooms', async () => {
  const response = await axios.get('/api/chatrooms');
  const { socket } = store.getState().auth;
  if (socket) {
    socket.emit('get_rooms');
  }
  return response.data;
});

export const getChatRoom = createAsyncThunk(
  'rooms/getChatRoom',
  async (roomId) => {
    const response = await axios.get(`/api/chatrooms/${roomId}`);
    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('get_room', roomId);
    }
    return response.data;
  },
);

export const createChatRoom = createAsyncThunk(
  'rooms/createChatRoom',
  async (room) => {
    const response = await axios.post('/api/chatrooms', room);
    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('create_room', room);
    }
    return response.data;
  },
);

export const updateChatRoom = createAsyncThunk(
  'rooms/updateChatRoom',
  async ({ roomId, room }) => {
    const response = await axios.put(`/api/chatrooms/${roomId}`, room);
    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('update_room', { roomId, room });
    }
    return response.data;
  },
);

export const deleteChatRoom = createAsyncThunk(
  'rooms/deleteChatRoom',
  async (roomId) => {
    const response = await axios.delete(`/api/chatrooms/${roomId}`);
    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('delete_room', roomId);
    }
    return response.data;
  },
);

export const addMessageToRoom = createAction(
  'rooms/addMessageToRoom',
  (payload) => {
    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('add_message_to_room', payload);
    }
    return { payload };
  },
);

export const loadRooms = createAsyncThunk('rooms/loadRooms', async () => {
  const response = await axios.get('/api/chatrooms/load');
  const { socket } = store.getState().auth;
  if (socket) {
    socket.emit('load_rooms');
  }
  return response.data;
});
