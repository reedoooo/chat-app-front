import io from 'socket.io-client';

// import { initSocket } from './authActions';

const socket = io('http://localhost:3001');  // replace with your server's address

export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR';

export const createRoom = (newRoom) => async (dispatch) => {
  try {
    // Emit room creation event to the server
    socket.emit('ROOM_CREATED', newRoom);
  } catch (error) {
    dispatch({
      type: CREATE_ROOM_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setRoomDescription = (room) => ({
  type: 'SET_ROOM_DESCRIPTION',
  payload: room,
});


export const roomDeleted = (roomId) => {
  return {
    type: 'ROOM_DELETED',
    payload: roomId,
  };
};

export const roomSelected = (roomId) => {
  return {
    type: 'ROOM_SELECTED',
    payload: roomId,
  };
};
