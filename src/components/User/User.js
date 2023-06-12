import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/userActions';
import { loginUser, registerUser } from '../../actions/userActions';
import io from 'socket.io-client';

let socket;

const User = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    socket = io('http://localhost:3001');

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      socket.emit('login', { username, password }, (response) => {
        if(response.success) {
          dispatch(loginUser({ username, password }));
        } else {
          // handle error
        }
      });
    }
  };
  
  const handleRegister = () => {
    if (username !== '' && password !== '') {
      socket.emit('register', { username, password }, (response) => {
        if(response.success) {
          dispatch(registerUser({ username, password }));
        } else {
          // handle error
        }
      });
    }
  };

  return (
    <div>
      <h1>User</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default User;
