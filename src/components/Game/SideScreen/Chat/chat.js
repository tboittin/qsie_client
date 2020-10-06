import React from "react";

import "./chat.css";

import Input from "./Input/input";
import Messages from "./Messages/messages";

const Chat = ({name, messages, message, setMessage, sendMessage}) => {

  return (
    <div className="chat">
      <Messages 
        messages={messages}
        name={name}
      />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
