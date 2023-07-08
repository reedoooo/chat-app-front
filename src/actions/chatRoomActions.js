import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction, createThunkAction } from '../utils/createAction';
import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

export const setSocket = createAction('SET_SOCKET');
export const receiveMessage = createAction('RECEIVE_MESSAGE');
export const addChatMessage = createAction(
  'ADD_CHAT_MESSAGE',
  (roomId, message) => ({ roomId, message }),
);
export const addReaction = createAction(
  'ADD_REACTION',
  (messageId, userId, reaction) => ({ messageId, userId, reaction }),
);
export const addNotification = createAction('ADD_NOTIFICATION');
export const setUserTyping = createAction('SET_USER_TYPING');
export const selectRoom = createAction('SELECT_ROOM');
export const messageRead = createAction(
  'MESSAGE_READ',
  (messageId, userId) => ({ messageId, userId }),
);
export const sendPrivateMessage = createAction(
  'SEND_PRIVATE_MESSAGE',
  (senderId, receiverId, message) => ({ senderId, receiverId, message }),
);

export const getChatRooms = createThunkAction('GET_CHATROOMS', () =>
  axios.get('/chatRooms'),
);
export const getChatRoom = createThunkAction('GET_CHATROOM', (roomId) =>
  axios.get(`/chatRooms/${roomId}`),
);
export const createChatRoom = createThunkAction('CREATE_CHATROOM', (room) =>
  axios.post('/chatRooms', room),
);
export const updateChatRoom = createThunkAction(
  'UPDATE_CHATROOM',
  (roomId, room) => axios.put(`/chatRooms/${roomId}`, room),
);
export const deleteChatRoom = createThunkAction('DELETE_CHATROOM', (roomId) =>
  axios.delete(`/chatRooms/${roomId}`),
);

export const loadRooms = createAsyncThunk(
  'LOAD_ROOMS',
  async (_, { dispatch, getState }) => {
    // Fetch rooms data from an API
    const response = await fetch('/api/rooms');
    const rooms = await response.json();
    return rooms;
  },
);

export const sendMessage = (message) => (dispatch, getState) => {
  const { chat } = getState();
  if (chat.socket) {
    chat.socket.emit('SEND_MESSAGE', { ...message, room: chat.currentRoom });
  }
};

export const addUserToRoom = (roomId, userId) => (dispatch, getState) => {
  const { chat } = getState();
  if (chat.socket) {
    chat.socket.emit('ADD_USER_TO_ROOM', { roomId, userId });
  }
};

export const joinRoom = () => (dispatch, getState) => {
  const { chat } = getState();
  if (chat.socket) {
    chat.socket.emit('joinRoom', chat.currentRoom);
  }
};

export const loadMessages = () => {
  const messages = localStorage.getItem('messages');
  return {
    type: 'LOAD_MESSAGES',
    payload: messages ? JSON.parse(messages) : [],
  };
};

export const saveMessages = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
  return {
    type: 'SAVE_MESSAGES',
    payload: messages,
  };
};

// in your chatRoomActions.js file
export const getSocket = () => (dispatch, getState) => {
  // Get the socket instance from the Redux state
  return getState().chat.socket;
};
