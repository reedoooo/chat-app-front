import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

export const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(
    Cookies.get('rooms') ? JSON.parse(Cookies.get('rooms')) : [],
  );
  const [roomJoin, setJoined] = useState(null);
  const [roomLeave, setLeft] = useState(null);
  const [roomCreate, setRoom] = useState(null);
  const [roomDelete, setDelete] = useState(null);

  // const socket = io('http://localhost:3002', { transports: ['websocket'] });

  useEffect(() => {
    Cookies.set('rooms', JSON.stringify(rooms));
  }, [rooms]);

  const addRoom = (room) => {
    setRooms([...rooms, room]);
    setRoom(room);
  };

  const removeRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    if (roomCreate && roomCreate.id === id) {
      setRoom(null);
    }
  };

  // const sendMessage = (user, room, message) => {
  //   socket.emit('CHAT_MESSAGE', room, message);
  // };

  const joinRoom = (room) => {
    setJoined(room);
  };

  const leaveRoom = (room) => {
    setLeft(room);
    if (roomJoin && roomJoin.id === room.id) {
      setJoined(null);
    }
  };

  const deleteRoom = (room) => {
    setDelete(room);
    removeRoom(room.id);
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        addRoom,
        removeRoom,
        roomJoin,
        joinRoom,
        roomLeave,
        leaveRoom,
        roomCreate,
        roomDelete,
        deleteRoom,
        // sendMessage, // Make sure to provide this function to the context
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
