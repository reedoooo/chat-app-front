import { createSlice } from '@reduxjs/toolkit';
import {
  initSocket,
  loginUser,
  registerUser,
  loadUser,
} from '../actions/authActions';

const initialState = {
  user: null,
  status: 'idle', // Add this to track the status of async requests
  error: null, // Add this to handle any potential errors from our async requests
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserAndToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    // handle user initialization
    builder.addCase(initSocket.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });
    builder.addCase(initSocket.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(initSocket.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });
    // handle user login
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });
    // handle user registration
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });
    // handle load user
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'idle';
    });
    builder.addCase(loadUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message;
    });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
