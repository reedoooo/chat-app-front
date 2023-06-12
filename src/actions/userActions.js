import io from 'socket.io-client';

const socket = io(); // Connect to the socket.io server

export const userLoggedIn = (user) => ({
  type: 'USER_LOGGED_IN',
  payload: user,
});

export const userLoggedOut = (user) => ({
  type: 'USER_LOGGED_OUT',
  payload: user,
});

export const userRegistered = (user) => ({
  type: 'USER_REGISTERED',
  payload: user,
});

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const joinRoom = (userId, roomId) => (dispatch) => {
  // Emit the 'joinRoom' event on the socket
  socket.emit('USER_JOINED', roomId);

  // Dispatch the 'joinRoom' action
  dispatch({
    type: 'USER_JOINED',
    payload: { userId, roomId },
  });
};

export const leaveRoom = (userId, roomId) => (dispatch) => {
  socket.emit('USER_LEFT', roomId);

  dispatch({
    type: 'USER_LEFT',
    payload: { userId, roomId },
  });
};

// export const setUserOnlineStatus = (userId, isOnline) => ({
//   type: 'SET_USER_ONLINE_STATUS',
//   payload: { userId, isOnline },
// });
