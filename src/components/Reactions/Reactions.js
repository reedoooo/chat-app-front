// components/Reactions/Reactions.js
import { useDispatch } from 'react-redux';
import { addReaction } from '../../actions/messageActions';

const REACTIONS = ['😀', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋'];

const Reactions = ({ messageId }) => {
  const dispatch = useDispatch();

  const handleAddReaction = (reaction) => {
    dispatch(addReaction(messageId, reaction));
  };

  return (
    <div>
      {REACTIONS.map((reaction) => (
        <button key={reaction} onClick={() => handleAddReaction(reaction)}>
          {reaction}
        </button>
      ))}
    </div>
  );
};

export default Reactions;
