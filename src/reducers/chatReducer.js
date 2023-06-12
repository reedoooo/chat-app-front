// reducers/chatReducer.js
const initialState = {
  currentRoom: null,
  rooms: {},
  messages: [],
  isUserTyping: false,
  socket: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_SOCKET':
    return {
      ...state,
      socket: action.payload,
    };
  case 'SEND_MESSAGE': {
    const roomMessages = state.rooms[state.currentRoom] || [];
    return {
      ...state,
      rooms: {
        ...state.rooms,
        [state.currentRoom]: [...roomMessages, action.payload],
      },
      messages: [...state.messages, action.payload],
    };
  }
  case 'JOIN_ROOM':
    return {
      ...state,
      currentRoom: action.payload,
      rooms: {
        ...state.rooms,
        [action.payload]: state.rooms[action.payload] || [],
      },
    };
  case 'ADD_CHAT_MESSAGE':
    return {
      ...state,
      rooms: {
        ...state.rooms,
        [action.payload.roomId]: [
          ...(state.rooms[action.payload.roomId] || []),
          action.payload.message,
        ],
      },
    };
  case 'ADD_REACTION':
    return {
      ...state,
      messages: state.messages.map((message) =>
        message.id === action.payload.messageId
          ? {
            ...message,
            reactions: [
              ...(message.reactions || []),
              {
                userId: action.payload.userId,
                reaction: action.payload.reaction,
              },
            ],
          }
          : message,
      ),
    };
  case 'LOAD_MESSAGES':
    return {
      ...state,
      messages: action.payload,
    };
  case 'SAVE_MESSAGES':
    return {
      ...state,
      messages: action.payload,
    };
  case 'MESSAGE_READ':
    return {
      ...state,
      messages: state.messages.map((message) =>
        message.id === action.payload.messageId
          ? {
            ...message,
            readBy: [...(message.readBy || []), action.payload.userId],
          }
          : message,
      ),
    };
  case 'SEND_PRIVATE_MESSAGE':
    return {
      ...state,
      privateMessages: [
        ...(state.privateMessages || []),
        {
          senderId: action.payload.senderId,
          receiverId: action.payload.receiverId,
          message: action.payload.message,
        },
      ],
    };
  default:
    return state;
  }
};

export default chatReducer;
