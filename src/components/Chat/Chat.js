import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendMessage,
  selectRoom,
  setUserTyping,
  loadMessages,
  addNotification,
} from '../../actions/chatActions';
import Message from '../Message/Message';
import { debounce } from 'lodash';
import io from 'socket.io-client';

const Chat = () => {
  const dispatch = useDispatch();
  const currentRoom = useSelector((state) => state.chat.currentRoom);
  const roomsMessages = useSelector(
    (state) => state.chat.rooms[currentRoom] || [],
  );
  const messages = useSelector((state) => state.chat.messages);
  const isUserTyping = useSelector((state) => state.chat.isUserTyping);

  const [newMessage, setNewMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('message', (message) => {
      console.log('Received message:', message);
      dispatch(sendMessage(message));
    });

    socket.on('notification', (notification) => {
      console.log('Received notification:', notification);
      dispatch(addNotification(notification));
    });

    return () => {
      socket.disconnect();
    };
  }, [currentRoom]);

  const handleSend = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, room: currentRoom };
      dispatch(sendMessage(message));
      setNewMessage('');
    }
  };

  const handleUserTyping = debounce(() => {
    dispatch(setUserTyping(true));
  }, 300);

  const handleRoomChange = (event) => {
    event.preventDefault();
    dispatch(selectRoom(selectedRoom));
  };

  useEffect(() => {
    dispatch(loadMessages());
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome to the Chat!</h1>
      {currentRoom && (
        <>
          <h2>{currentRoom}</h2>
          {roomsMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <form onSubmit={handleSend}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleUserTyping();
              }}
              placeholder="Type your message here..."
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
      <h1>Global Chat</h1>
      {messages.map((message, index) => (
        <p key={index}>{message.text}</p>
      ))}
      <form onSubmit={handleRoomChange}>
        <input
          type="text"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          placeholder="Enter room id..."
        />
        <button type="submit">Change Room</button>
      </form>
      {isUserTyping && <p>A user is typing...</p>}
    </div>
  );
};

export default Chat;
