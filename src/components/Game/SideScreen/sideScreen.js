import React from "react";
import VS from "./VS/vs";
import Chat from "./Chat/chat";

import "./sideScreen.scss";
import Surrender from "./Surrender/surrender";

const SideScreen = ({
  name,
  opponentName,
  userCharacter,
  room,
  sendLocalMessage,
  message,
  messages,
  setMessage,
  sendEndGame
}) => {
  return (
    <div className="sideScreen">
      <VS
        name={name}
        opponentName={opponentName}
        userCharacter={userCharacter}
      />
      <Chat
        name={name}
        room={room}
        sendLocalMessage={sendLocalMessage}
        message={message}
        messages={messages}
        setMessage={setMessage}
      />
      <Surrender sendEndGame={sendEndGame} />
    </div>
  );
};

export default SideScreen;
