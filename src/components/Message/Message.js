// components/Message/Message.js
import Reactions from '../Reactions/Reactions';

const Message = ({ message }) => {
  return (
    <div>
      <h2>{message.user}</h2>
      <p>{message.text}</p>
      <Reactions messageId={message.id} />
      <div>
        {message.reactions &&
          message.reactions.map((reaction) => (
            <span key={reaction.id}>{reaction}</span>
          ))}
      </div>
    </div>
  );
};

export default Message;
