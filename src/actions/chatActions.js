import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import io from 'socket.io-client';

// Define the actions here
export const addRoomToState = createAction('chat/addRoomToState');
export const removeUserFromRoom = createAction('chat/removeUserFromRoom');
export const deleteRoomFromState = createAction('chat/deleteRoomFromState');

export const initSocket = createAsyncThunk('INIT_SOCKET', async () => {
  const socket = io('http://localhost:3002', { transports: ['websocket'] });

  // Perform any necessary initialization logic here

  return socket;
});

export const createRoom = createAsyncThunk(
  'chat/createRoom',
  async (room, { getState }) => {
    // Logic for creating room using socket.io and axios
    const { socket } = getState().chat;
    const response = await axios.post('/chatRooms', room);
    socket.emit('createRoom', response.data);
    return response.data;
  },
);

export const joinRoom = createAsyncThunk(
  'chat/joinRoom',
  async ({ roomId, userId }, { getState }) => {
    // Logic for joining room using socket.io
    const { socket } = getState().chat;
    socket.emit('joinRoom', { roomId, userId });
    return { roomId, userId };
  },
);

export const leaveRoom = createAsyncThunk(
  'chat/leaveRoom',
  async ({ roomId, userId }, { getState }) => {
    // Logic for leaving room using socket.io
    const { socket } = getState().chat;
    socket.emit('leaveRoom', { roomId, userId });
    return { roomId, userId };
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ roomId, message }, { getState }) => {
    // Logic for sending message using socket.io
    const { socket } = getState().chat;
    socket.emit('sendMessage', { roomId, message });
    return { roomId, message };
  },
);

export const receiveMessage = createAction(
  'chat/receiveMessage',
  (message) => ({ payload: message }),
);
export const addChatMessage = createAction(
  'chat/addChatMessage',
  (roomId, message) => ({ payload: { roomId, message } }),
);
export const addReaction = createAction(
  'chat/addReaction',
  (messageId, userId, reaction) => ({
    payload: { messageId, userId, reaction },
  }),
);
export const setUserTyping = createAction('chat/setUserTyping');
export const selectRoom = createAction('chat/selectRoom');
export const messageRead = createAction(
  'chat/messageRead',
  (messageId, userId) => ({ payload: { messageId, userId } }),
);
export const sendPrivateMessage = createAction(
  'chat/sendPrivateMessage',
  (senderId, receiverId, message) => ({
    payload: { senderId, receiverId, message },
  }),
);

export const addUserToRoom = createAsyncThunk(
  'chat/addUserToRoom',
  async ({ userId, roomId }, { getState }) => {
    const { socket } = getState().chat;
    socket.emit('addUserToRoom', { userId, roomId });
    return { userId, roomId };
  },
);

export const loadRooms = createAsyncThunk(
  'chat/loadRooms',
  async (_, { getState }) => {
    const response = await axios.get('/chatRooms');
    return response.data;
  },
);

export const addNotification = createAction(
  'chat/addNotification',
  (notification) => ({ payload: notification }),
);

export const loadMessages = createAsyncThunk(
  'chat/loadMessages',
  async (roomId) => {
    const response = await axios.get(`/chatRooms/${roomId}/messages`);
    return response.data;
  },
);

export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async (room, { getState }) => {
    const { socket } = getState().chat;
    const response = await axios.post('/chatRooms', room);
    socket.emit('createChatRoom', response.data);
    return response.data;
  },
);

export const getSocket = createAsyncThunk(
  'chat/getSocket',
  async (_, { getState }) => {
    return getState().chat.socket;
  },
);

export const setSocket = createAction('chat/setSocket', (socket) => ({
  payload: socket,
}));

// action to handle user typing
export const userTyping = createAction('chat/userTyping');

// Async thunk to handle a saga for chat operations
export const chatSaga = createAsyncThunk(
  'chat/chatSaga',
  async ({ userId, roomId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/chat/sendMessage', {
        userId,
        roomId,
        message,
      });
      const data = response.data;

      if (response.status === 200) {
        return data;
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
