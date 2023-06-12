import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

const ExampleComponent = () => {
  useEffect(() => {
    socket = io('http://localhost:3001');

    // Example of sending a simple message to the server
    socket.emit('simple_message', 'Hello, server!');

    return () => {
      socket.disconnect();
    };
  }, []);

  // ...
};

export default ExampleComponent;
