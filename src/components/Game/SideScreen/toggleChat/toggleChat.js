import React from "react";

import "./toggleChat.scss";

const ToggleChat = ({ chat, toggleChat }) => (
  <div className="toggleChat hover" onClick={toggleChat}>
    {chat && "Désactiver le chat"}
    {!chat && "Activer le chat"}
  </div>
);

export default ToggleChat;
