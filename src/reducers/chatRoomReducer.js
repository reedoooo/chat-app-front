import { createSlice } from '@reduxjs/toolkit';
import {
  addChatMessage,
  messageRead,
  userTyping,
} from '../actions/chatActions';

const initialState = {
  rooms: [],
  currentRoom: null,
  messages: {},
  isUserTyping: false,
  socket: null,
};
/* eslint-disable no-unused-vars */
const chatRoomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addChatMessage, (state, action) => {
        const { roomId, message } = action.payload;
        state.messages[roomId] = state.messages[roomId] || [];
        state.messages[roomId].push(message);
      })
      .addCase(messageRead, (state, action) => {
        const { messageId, userId } = action.payload;
        Object.values(state.messages).forEach((roomMessages) => {
          const message = roomMessages.find((msg) => msg.id === messageId);
          if (message) {
            message.readBy = message.readBy || [];
            message.readBy.push(userId);
          }
        });
      })
      .addCase(userTyping, (state, action) => {
        state.isUserTyping = action.payload;
      });
  },
});

export default chatRoomSlice.reducer;
