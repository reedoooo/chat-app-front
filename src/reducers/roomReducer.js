// reducers/roomReducer.js
const initialState = {
  rooms: [],
  selectedRoom: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ROOM_CREATED':
    return {
      ...state,
      rooms: [...state.rooms, action.payload],
    };
  case 'ROOM_DELETED':
    return {
      ...state,
      rooms: state.rooms.filter(room => room.name !== action.payload),
    };
    
  case 'ROOM_SELECTED':
    return {
      ...state,
      selectedRoom: action.payload,
    };
  case 'SET_ROOM_DESCRIPTION':
    return {
      ...state,
      rooms: state.rooms.map((room) =>
        room.name === action.payload.roomName
          ? { ...room, description: action.payload.description }
          : room,
      ),
    };
  default:
    return state;
  }
};

export default roomReducer;
