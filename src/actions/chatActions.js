import io from 'socket.io-client';

// actions/chatActions.js
export const setSocket = (socket) => ({
  type: 'SET_SOCKET',
  payload: socket,
});

export const sendMessage = (message) => (dispatch, getState) => {
  const { chat } = getState();
  if (chat.socket) {
    chat.socket.emit('SEND_MESSAGE', { ...message, room: chat.currentRoom });
  }
};

// Action to receive a message
export const receiveMessage = (message) => ({
  type: 'RECEIVE_MESSAGE',
  payload: message,
});

// Action to join a room
export const joinRoom = () => (dispatch, getState) => {
  const { chat } = getState();
  if (chat.socket) {
    chat.socket.emit('joinRoom', chat.currentRoom);
  }
};

// Action to add a chat message
export const addChatMessage = (roomId, message) => ({
  type: 'ADD_CHAT_MESSAGE',
  payload: { roomId, message },
});

// Action to add a reaction
export const addReaction = (messageId, userId, reaction) => ({
  type: 'ADD_REACTION',
  payload: { messageId, userId, reaction },
});

// Load chat messages from local storage
export const loadMessages = () => {
  const messages = localStorage.getItem('messages');
  return {
    type: 'LOAD_MESSAGES',
    payload: messages ? JSON.parse(messages) : [],
  };
};

// Save chat messages to local storage
export const saveMessages = (messages) => {
  localStorage.setItem('messages', JSON.stringify(messages));
  return {
    type: 'SAVE_MESSAGES',
    payload: messages,
  };
};

// Action to mark a message as read
export const messageRead = (messageId, userId) => ({
  type: 'MESSAGE_READ',
  payload: { messageId, userId },
});

// Action to send a private message
export const sendPrivateMessage = (senderId, receiverId, message) => ({
  type: 'SEND_PRIVATE_MESSAGE',
  payload: { senderId, receiverId, message },
});

// Initialize the socket
export const initSocket = () => (dispatch) => {
  const socket = io(); // Connect to the socket.io server
  dispatch(setSocket(socket));
};
