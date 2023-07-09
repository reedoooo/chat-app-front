import { createSlice } from '@reduxjs/toolkit';
import {
  initSocket,
  loadUser,
  removeUser,
  updateUser,
  loginUser,
  registerUser,
  logoutUser,
} from '../actions/authActions';

const initialState = {
  socket: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (state.socket) {
          state.socket.userId = action.payload.user._id;
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (state.socket) {
          state.socket.userId = action.payload.user._id;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        if (state.socket) {
          state.socket.userId = null;
        }
      })
      .addCase(initSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.socket) {
          state.socket.userId = action.payload._id;
        }
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.user = null;
        if (state.socket) {
          state.socket.userId = null;
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.socket) {
          state.socket.userId = action.payload._id;
        }
      });
  },
});

export default authSlice.reducer;
