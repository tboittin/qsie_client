import React, { useEffect } from "react";

import "./game.scss";

import GameHeader from "./GameHeader/gameHeader";
import { Col, Row } from "reactstrap";
import GameGrid from "./GameGrid/gameGrid";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SideScreen from "./SideScreen/sideScreen";

const Game = ({
  name,
  room,
  userCharacter,
  opponentName,
  opponentCharacter,
  characters,
  message,
  messages,
  isGameStarted,
  isGameOver,
  setMessage,
  sendMessage,
  setWinner,
  setIsGameOver,
  sendEndGame,
}) => {
  useEffect(() => {
    if (isGameOver) {
      sendEndGame();
      return <Redirect to={`/winScreen`} />;
    }
  }, [isGameOver]);

  const sendLocalMessage = (event) => {
    if (message) {
      sendMessage();
    }
  };

  if (!opponentCharacter) {
    opponentCharacter = {
      name: "5000",
      opponentCharacter: true,
      display: "unknown",
    };
  }

  return (
    <div className="game">
      <Row className="w-100 h-100 m-0">
        <Col xs="8" className="p-0">
        <GameHeader
          name={name}
          opponentName={opponentName}
          userCharacter={userCharacter}
        />
          {isGameStarted && (
            <GameGrid
              opponentCharacter={opponentCharacter}
              characters={characters}
              setWinner={setWinner}
              setIsGameOver={setIsGameOver}
            />
          )}
          {!isGameStarted && <h1>Wait for the other player...</h1>}
        </Col>
        <Col xs="4" className="p-0 h-100">
          <SideScreen
            name={name}
            opponentName={opponentName}
            userCharacter={userCharacter}
            room={room}
            sendLocalMessage={sendLocalMessage}
            message={message}
            messages={messages}
            setMessage={setMessage}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Game;
