import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    deleteMessage: (state, action) => {
      return state.filter((message) => message.id !== action.payload);
    },
    // add more reducers here
  },
});

export const { addMessage, deleteMessage } = messageSlice.actions;

export default messageSlice.reducer;
