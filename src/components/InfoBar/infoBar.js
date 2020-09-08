import React from "react";

import "./infoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src="onlineIcon.png" alt="online" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src="closeIcon.png" alt="close" />
      </a>
    </div>
  </div>
);

export default InfoBar;
