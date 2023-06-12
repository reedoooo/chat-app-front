// components/Room/Room.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChatMessage } from '../../actions/chatActions';
import Message from '../Message/Message';

const Chatroom = ({ roomId }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.rooms[roomId] || []);
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addChatMessage(roomId, { user: 'testUser', text: messageText }));  // TODO: replace 'testUser' with the current user
    setMessageText('');
  };

  return (
    <div>
      <h1>Room {roomId}</h1>
      {messages.map((message) => <Message key={message.id} message={message} />)}
      <form onSubmit={handleSubmit}>
        <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatroom;
