import React, { useState } from "react";
import VS from "./VS/vs";
import Chat from "./Chat/chat";

import "./sideScreen.scss";
import Surrender from "./Surrender/surrender";
import ToggleChat from "./toggleChat/toggleChat";

const SideScreen = ({
  name,
  opponentName,
  userCharacter,
  room,
  message,
  messages,
  setMessage,
  sendMessage,
  handleChangeRoom,
  sendEndGame,
  leftRoom,
}) => {
  const [chat, setChat] = useState(true);
  const toggleChat = () => {
    setChat(!chat);
  };
  return (
    <div className="sideScreen">
      <div className={"sideScreenInner" + (chat ? "-chat" : "")}>
        <ToggleChat chat={chat} toggleChat={toggleChat} />
        <VS
          name={name}
          opponentName={opponentName}
          userCharacter={userCharacter}
          chat={chat}
        />
        {chat && (
          <Chat
            name={name}
            room={room}
            sendMessage={sendMessage}
            message={message}
            messages={messages}
            setMessage={setMessage}
            toggleChat={toggleChat}
          />
        )}
      </div>

      <Surrender
        handleChangeRoom={handleChangeRoom}
        sendEndGame={sendEndGame}
        leftRoom={leftRoom}
      />
    </div>
  );
};

export default SideScreen;
