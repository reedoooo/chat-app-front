// reducers/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import messageReducer from './messageReducer';

// import roomReducer from './roomReducer';
import notificationReducer from './notificationReducer';
import chatReducer from './chatRoomReducer.js';

const rootReducer = combineReducers({
  messages: messageReducer,
  auth: authReducer,
  chatRoom: chatReducer,
  user: userReducer,
  notifications: notificationReducer,
});

export default rootReducer;
