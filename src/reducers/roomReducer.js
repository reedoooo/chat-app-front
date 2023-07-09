import { createSlice } from '@reduxjs/toolkit';
import {
  getChatRooms,
  getChatRoom,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom,
  addMessageToRoom,
  loadRooms,
} from '../actions/roomActions';

const initialState = {
  rooms: [],
  currentRoom: null,
  messages: {},
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(getChatRoom.fulfilled, (state, action) => {
        state.currentRoom = action.payload;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(updateChatRoom.fulfilled, (state, action) => {
        const updatedRoom = action.payload;
        const roomIndex = state.rooms.findIndex(
          (room) => room._id === updatedRoom._id,
        );
        if (roomIndex !== -1) {
          state.rooms[roomIndex] = updatedRoom;
        }
      })
      .addCase(deleteChatRoom.fulfilled, (state, action) => {
        const roomId = action.payload;
        state.rooms = state.rooms.filter((room) => room._id !== roomId);
      })
      .addCase(addMessageToRoom, (state, action) => {
        const { roomId, message } = action.payload;
        if (!state.messages[roomId]) {
          state.messages[roomId] = [];
        }
        state.messages[roomId].push(message);
      })
      .addCase(loadRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      });
  },
});

export default roomSlice.reducer;
