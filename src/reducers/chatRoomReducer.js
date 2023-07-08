import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
  currentRoom: null,
  messages: {}, // Now is an object with room IDs as keys.
  isUserTyping: false,
  socket: null,
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {
    getChatRooms: (state, action) => {
      state.rooms = action.payload;
    },
    getChatRoom: (state, action) => {
      state.currentRoom = action.payload;
      state.rooms[action.payload] = state.rooms[action.payload] || [];
    },
    joinRoom: (state, action) => {
      state.currentRoom = action.payload;
      state.rooms[action.payload] = state.rooms[action.payload] || [];
    },
    createChatRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    updateChatRoom: (state, action) => {
      const index = state.rooms.findIndex(
        (room) => room._id === action.payload._id,
      );
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    deleteChatRoom: (state, action) => {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    sendMessage: (state, action) => {
      const { roomId, ...message } = action.payload;
      state.rooms[roomId] = state.rooms[roomId] || [];
      state.rooms[roomId].push(message);
    },
    addChatMessage: (state, action) => {
      const { roomId, message } = action.payload;
      state.rooms[roomId] = state.rooms[roomId] || [];
      state.rooms[roomId].push(message);
    },
    addReaction: (state, action) => {
      const { messageId, userId, reaction } = action.payload;
      const message = state.messages.find((msg) => msg.id === messageId);
      if (message) {
        message.reactions = message.reactions || [];
        message.reactions.push({ userId, reaction });
      }
    },
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
    saveMessages: (state, action) => {
      state.messages = action.payload;
    },
    messageRead: (state, action) => {
      const { messageId, userId } = action.payload;
      const message = state.messages.find((msg) => msg.id === messageId);
      if (message) {
        message.readBy = message.readBy || [];
        message.readBy.push(userId);
      }
    },
    sendPrivateMessage: (state, action) => {
      const { senderId, receiverId, message } = action.payload;
      state.privateMessages = state.privateMessages || [];
      state.privateMessages.push({ senderId, receiverId, message });
    },
  },
});

export default chatRoomSlice.reducer;
export const {
  getChatRooms,
  getChatRoom,
  joinRoom,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom,
  setSocket,
  sendMessage,
  addChatMessage,
  addReaction,
  loadMessages,
  saveMessages,
  messageRead,
  sendPrivateMessage,
} = chatRoomSlice.actions;
