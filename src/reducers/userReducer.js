const initialState = {
  user: null,
  rooms: {}, 
  users: [], // Add this line to define the 'users' property
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'USER_JOINED':
    return {
      ...state,
      rooms: {
        ...state.rooms,
        [action.payload.roomId]: [
          ...(state.rooms[action.payload.roomId] || []),
          { type: action.type, user: action.payload.userId },
        ],
      },
    };
  case 'USER_LEFT':
    return {
      ...state,
      rooms: {
        ...state.rooms,
        [action.payload.roomId]: state.rooms[action.payload.roomId].filter(
          user => user.user !== action.payload.userId,
        ),
      },
    };
    
  case 'USER_LOGGED_IN':
    return { ...state, user: action.payload };
  case 'USER_LOGGED_OUT':
    return { ...state, user: null };
  case 'USER_REGISTERED':
    return { ...state, user: action.payload }; // Assumes registration automatically logs in the user

  case 'SET_USER_ONLINE_STATUS':
    return {
      ...state,
      users: state.users.map((user) =>
        user.id === action.payload.userId
          ? { ...user, isOnline: action.payload.isOnline }
          : user,
      ),
    };
  default:
    return state;
  }
};

export default userReducer;
