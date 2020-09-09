import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./game.css";

import Chat from "../Chat/chat";

let socket;

const Game = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // const ENDPOINT = 'http://localhost:5000/';
  const ENDPOINT = "https://qsie-server.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    // Unmount part
    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
      socket.on("message", (message) => {
        setMessages([...messages, message]);
      });
    },
    [messages]
  );

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <Chat
        name={name}
        room={room}
        sendMessage={sendMessage}
        message={message}
        messages={messages}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Game;
