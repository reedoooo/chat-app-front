import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChatRoom, updateChatRoom } from '../../actions/chatRoomActions';

const ChatRoomForm = ({ existingRoom }) => {
  const [room, setRoom] = useState(existingRoom || { name: '', description: '', color: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingRoom) {
      dispatch(updateChatRoom(existingRoom._id, room));
    } else {
      dispatch(createChatRoom(room));
    }
  };

  const handleInputChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text"
          name="name"
          value={room.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={room.description}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Color:
        <input
          type="color"
          name="color"
          value={room.color}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">{existingRoom ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ChatRoomForm;
