import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import "./chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {
    });

    // Unmount part
    return () => {
        socket.emit('disconnect');

        socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <>
      <h1>Chat</h1>
    </>
  );
};

export default Chat;
