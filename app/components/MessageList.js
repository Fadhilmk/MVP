const MessageList = ({ messages }) => {
    return (
      <div className="p-4">
        {messages.map((message, index) => (
          <div key={index} className="p-2 border rounded mb-2">
            <p><strong>From:</strong> {message.userName}</p>
            <p><strong>Message:</strong> {message.messageBody}</p>
            <p><strong>Timestamp:</strong> {new Date(message.timestamp * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageList;
  