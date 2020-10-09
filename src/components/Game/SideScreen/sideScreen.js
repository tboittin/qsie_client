import React, { useState } from "react";
import VS from "./VS/vs";
import Chat from "./Chat/chat";

import "./sideScreen.scss";
import Surrender from "./Surrender/surrender";

const SideScreen = ({
  name,
  opponentName,
  userCharacter,
  room,
  message,
  messages,
  setMessage,
  sendMessage,
  proximity,
  handleChangeRoom,
  sendEndGame
}) => {
  const [chat, setChat] = useState(true);
  const toggleChat = () => {
    setChat(!chat);
  }
  return (
    <div className="sideScreen">
      <VS
        name={name}
        opponentName={opponentName}
        userCharacter={userCharacter}
        chat={chat}
      />
      {!chat && 
      <p className="hover" onClick={toggleChat}>Chat OFF</p>
    }
      {/* {(proximity === 'distance') &&  */}
      {chat &&
        <Chat
          name={name}
          room={room}
          sendMessage={sendMessage}
          message={message}
          messages={messages}
          setMessage={setMessage}
          toggleChat={toggleChat}
        />
      }
      
      <Surrender handleChangeRoom={handleChangeRoom} sendEndGame={sendEndGame} />
    </div>
  );
};

export default SideScreen;
