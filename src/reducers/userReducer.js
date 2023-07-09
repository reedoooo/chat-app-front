import {
  USER_LOGGED_IN,
  USER_REGISTERED,
  USER_LOGGED_OUT,
  USER_JOINED_ROOM,
  USER_LEFT_ROOM,
  USER_TYPING,
  USER_STOPPED_TYPING,
  USER_SENT_MESSAGE,
  USER_READ_MESSAGE,
} from '../actions/actionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_LOGGED_IN:
  case USER_REGISTERED:
    return { ...state, user: action.payload, isAuthenticated: true };

  case USER_JOINED_ROOM:
  case USER_LEFT_ROOM:
    // Assuming action.payload has the roomId
    return { ...state, user: { ...state.user, room: action.payload } };

  case USER_TYPING:
  case USER_STOPPED_TYPING:
    // Assuming action.payload has the typing status
    return { ...state, user: { ...state.user, typing: action.payload } };

  case USER_SENT_MESSAGE:
  case USER_READ_MESSAGE:
    // Assuming action.payload has the message details
    return {
      ...state,
      user: {
        ...state.user,
        messages: [...state.user.messages, action.payload],
      },
    };

  case USER_LOGGED_OUT:
    return { ...state, user: null, isAuthenticated: false };

  default:
    return state;
  }
};

export default userReducer;
