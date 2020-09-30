import React from "react";

import "./message.css";

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
  let sentBy = '';
  const trimmedName = name.trim().toLowerCase();

  switch (user) {
    case 'admin' :
      sentBy = 'admin';
      break;
    case trimmedName :
      sentBy = 'currentUser';
      break;
    default :
      sentBy = 'opponent';
      break;
  }

  return (
    <>
      {(sentBy === 'currentUser') && (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10 m-0">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite m-0">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )}
      {(sentBy === 'opponent') && (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundWhite">
            <p className="messageText colorDark m-0">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10 m-0">{user}</p>
        </div>
      )}
      {(sentBy === 'admin') && (
        <div className="messageContainer justifyCenter">
          <div className="messageBox backgroundWhite">
            <p className="messageText colorDark m-0">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
