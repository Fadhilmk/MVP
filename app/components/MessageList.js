// app/components/MessageList.js

const MessageList = ({ messages }) => {
    return (
      <div className="p-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="p-2 border rounded mb-2">
              <p><strong>From:</strong> {message.userName}</p>
              <p><strong>Message:</strong> {message.messageBody}</p>
              <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
    );
  };
  
  export default MessageList;
  