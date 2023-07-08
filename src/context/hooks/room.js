import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(Cookies.get('rooms') ? JSON.parse(Cookies.get('rooms')) : []);

  const addRoom = (room) => {
    setRooms([...rooms, room]);
    Cookies.set('rooms', JSON.stringify([...rooms, room]));
  };

  const removeRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    Cookies.set('rooms', JSON.stringify(updatedRooms));
  };

  return (
    <RoomContext.Provider value={{ rooms, addRoom, removeRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
