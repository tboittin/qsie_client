import React from "react";

import "./chat.scss";

import Input from "./Input/input";
import Messages from "./Messages/messages";

const Chat = ({
  name,
  messages,
  message,
  setMessage,
  sendMessage,
  toggleChat,
}) => {
  return (
    <div className="chat">
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        toggleChat={toggleChat}
      />
    </div>
  );
};

export default Chat;
