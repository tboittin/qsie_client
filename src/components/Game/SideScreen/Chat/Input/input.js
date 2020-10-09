import React from "react";

import "./input.css";

const Input = ({ message, setMessage, sendMessage, toggleChat }) => (
  <form className="form">
    <p className="switch-chat-off" onClick={toggleChat}>Chat ON</p>
    <input
      className="input"
      type="text"
      placeholder="Pose une question..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? 
        sendMessage(event)
        : null
      }
    />
    <button
      className="sendButton"
      onClick={(event) => 
        sendMessage(event)
      }
    >Send</button>
  </form>
);

export default Input;
