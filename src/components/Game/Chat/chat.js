import React from "react";

import "./chat.css";

import InfoBar from "./InfoBar/infoBar";
import Input from "./Input/input";
import Messages from "./Messages/messages";

const Chat = ({name, room, messages, message, setMessage, sendLocalMessage}) => {

  return (
    <div className="chat">
      <InfoBar room={room} />
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
