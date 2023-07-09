import { useDispatch } from 'react-redux';
import { deleteRoom } from '../../actions/chatActions';
import ChatRoom from '.';

const ChatRoomList = ({ rooms }) => {
  const dispatch = useDispatch();

  const handleRoomClick = (roomId) => {
    dispatch(deleteRoom(roomId));
  };

  return (
    <div>
      {rooms.map((room) => (
        <ChatRoom
          key={room.id}
          room={room}
          onClick={() => handleRoomClick(room.id)}
        />
      ))}
    </div>
  );
};

export default ChatRoomList;
