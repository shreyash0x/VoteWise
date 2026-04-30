import React from 'react';
import { User } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  // Function to convert markdown-like bold (**) to actual bold tags
  const renderText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`message-wrapper ${isBot ? 'bot-message-wrapper' : 'user-message-wrapper'}`}>
      <div className={`avatar ${isBot ? 'bot-avatar orb-container' : 'user-avatar'}`}>
        {isBot ? (
          <div className="ai-orb">
            <div className="orb-core"></div>
            <div className="orb-ring"></div>
          </div>
        ) : (
          <User size={18} strokeWidth={2.5} />
        )}
      </div>
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        {message.text.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {renderText(line)}
            {i !== message.text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MessageBubble;
