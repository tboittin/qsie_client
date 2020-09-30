import React from "react";

import "./input.css";

const Input = ({ message, setMessage, sendLocalMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendLocalMessage(event) : null
      }
    />
    <button
      className="sendButton"
      onClick={(event) => sendLocalMessage(event)}
    >Send</button>
  </form>
);

export default Input;
