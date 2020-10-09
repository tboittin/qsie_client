import React, { useEffect, useState } from "react";

import "./game.scss";

import GameHeader from "./GameHeader/gameHeader";
import { Modal } from "reactstrap";
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
  winner,
  replay,
  changeRoom,
  proximity,
  varMonitoring,
  opponentStillThere,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [redirectToChooseCharacter, setRedirectToChooseCharacter] = useState(
    false
  );
  const [redirectToRooms, setRedirectToRooms] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      sendEndGame();
      toggle();
    }
  }, [isGameOver]);

  const handleReplay = () => {
    replay();
    setRedirectToChooseCharacter(true);
  };

  const handleChangeRoom = () => {
    changeRoom();
    setRedirectToRooms(true);
  };

  // if (!opponentCharacter) {
  //   opponentCharacter = {
  //     name: "5000",
  //     opponentCharacter: true,
  //     display: "unknown",
  //   };
  // }

  console.log("Game Monitoring");
  varMonitoring();

  return (
    <div className="game">
      <div className="left-panel">
          <GameHeader
            sendEndGame={sendEndGame}
            changeRoom={changeRoom}
          />
          {isGameStarted && opponentCharacter && (
            <GameGrid
              opponentCharacter={opponentCharacter}
              characters={characters}
              setWinner={setWinner}
              setIsGameOver={setIsGameOver}
              userCharacter={userCharacter}
            />
          )}
          {!isGameStarted && (
            <div className="waiting">
              <h1>En attente de l'autre joueur...</h1>
            </div>
          )}
      </div>
      <div className="right-pannel">
          <SideScreen
            name={name}
            opponentName={opponentName}
            userCharacter={userCharacter}
            room={room}
            sendMessage={sendMessage}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendEndGame={sendEndGame}
            proximity={proximity}
            handleChangeRoom={handleChangeRoom}
          />
      </div>
      <Modal isOpen={modal} size="xl" centered={true}>
        <div className="winModal">
          {winner && <h1>Tu as gagné contre {opponentName}!</h1>}
          {!winner && <h1>{opponentName} a gagné!</h1>}
          <div className="characters">
            <div className="user">
              <img src={userCharacter.image} alt={userCharacter.name} />
              <p>{userCharacter.name}</p>
            </div>
            <div className="opponent">
              <img src={opponentCharacter.image} alt={opponentCharacter.name} />
              <p>{opponentCharacter.name}</p>
            </div>
          </div>
          <div className="winButtons">
            <button onClick={handleReplay} className="button replay">
              Rejouer
            </button>
            <span onClick={handleChangeRoom} className="changeRoom">
              Changer de salon
            </span>
          </div>
        </div>
      </Modal>
      {redirectToChooseCharacter && <Redirect to={"/chooseCharacter"} />}
      {redirectToRooms && <Redirect to={"/rooms"} />}
      {!opponentStillThere && (
        <div>
          <Redirect to="/rooms" />
        </div>
      )}
    </div>
  );
};

export default Game;
