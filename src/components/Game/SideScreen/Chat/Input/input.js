import React from "react";

import "./input.css";

const Input = ({ message, setMessage, sendMessage }) => (
  <form className="form">
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
    <img 
      className="sendButton"
      onClick={(event) => 
        sendMessage(event)
      }
      src='./QSI_GA_Send_w_BG.png'
      alt="send"
    />
  </form>
);

export default Input;
