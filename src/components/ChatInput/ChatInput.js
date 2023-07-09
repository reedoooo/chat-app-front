
const ChatInput = ({ messageText, handleInputChange, handleInputSubmit }) => {
  return (
    <form onSubmit={handleInputSubmit}>
      <input type="text" value={messageText} onChange={handleInputChange} />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
