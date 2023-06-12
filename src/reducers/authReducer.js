// authReducer.js

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'auth/LOGIN':
    return {
      ...state,
      user: action.payload,
      isLoggedIn: true,
    };
  case 'auth/LOGOUT':
    return {
      ...state,
      user: null,
      isLoggedIn: false,
    };
  case 'auth/SET_USER':
    return {
      ...state,
      user: action.payload,
    };
  default:
    return state;
  }
};

export default authReducer;

