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
  sendMessage,
  sendEndGame,
  proximity
}) => {
  return (
    <div className="sideScreen">
      <VS
        name={name}
        opponentName={opponentName}
        userCharacter={userCharacter}
      />
      {(proximity === 'distance') &&
        <Chat
          name={name}
          room={room}
          sendMessage={sendMessage}
          message={message}
          messages={messages}
          setMessage={setMessage}
        />
      }
      
      <Surrender sendEndGame={sendEndGame} />
    </div>
  );
};

export default SideScreen;
