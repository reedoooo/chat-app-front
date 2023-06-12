// reducers/rootReducer.js
import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import userReducer from './userReducer';

import authReducer from './authReducer';

import roomReducer from './roomReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({

  chat: chatReducer,
  auth: authReducer,
  user: userReducer,
  room: roomReducer,
  notifications: notificationReducer,
});

export default rootReducer;
