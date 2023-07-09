import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import io from 'socket.io-client';
import { chatSaga } from '../actions/chatActions';
import { all } from 'redux-saga/effects';
import rootReducer from '../reducers/rootReducer';
import axios from 'axios';
import Cookies from 'js-cookie';

// Define rootSaga
function* rootSaga() {
  yield all([chatSaga()]);
}

// Async action creator using createAsyncThunk
export const initSocket = createAsyncThunk('INIT_SOCKET', async () => {
  const socket = io('http://localhost:3002', { transports: ['websocket'] });
  // Perform any necessary initialization logic here
  return socket;
});

// Async action creator for register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUserInfo) => {
    const res = await axios.post('/api/auth/register', newUserInfo);

    const { socket } = store.getState().auth;
    if (socket) {
      socket.emit('register_user', newUserInfo);
    }

    return res.data;
  },
);

// Async action creator for login user
// Async action creator for login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', user);
      const data = response.data;

      if (
        response.status === 200 &&
        data.message === 'Logged in successfully'
      ) {
        // Save the user data and token in cookies
        Cookies.set('token', data.token);
        Cookies.set('userId', data.user._id);

        // Get the current state of the socket from the store
        const { socket } = store.getState().auth;
        if (socket) {
          // Emit a login_user event to the server
          socket.emit('login_user', user);
        }

        // Return the response data to be saved in the store
        return data;
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Then run the saga
sagaMiddleware.run(rootSaga);

export default store;
