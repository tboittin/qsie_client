import React from "react";

import "./chat.css";

import Input from "./Input/input";
import Messages from "./Messages/messages";

const Chat = ({name, room, messages, message, setMessage, sendLocalMessage}) => {

  return (
    <div className="chat">
      <Messages 
        messages={messages}
        name={name}
      />
      <Input
        message={message}
        setMessage={setMessage}
        sendLocalMessage={sendLocalMessage}
      />
    </div>
  );
};

export default Chat;
