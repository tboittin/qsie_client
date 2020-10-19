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
  startGame,
  cleanCharacters,
  leftRoom
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [redirectToChooseCharacter, setRedirectToChooseCharacter] = useState(
    false
  );
  const [redirectToRooms, setRedirectToRooms] = useState(false);
  const [winCharacterUser, setWinCharacterUser] = useState({});
  const [winCharacterOpponent, setWinCharacterOpponent] = useState({});
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (name === "") {
      console.log("name is empty");
      setRedirectToHome(true);
    } else {
      console.log("name:", name);
    }
  }, []);

  useEffect(() => {
    if (isGameOver) {
      sendEndGame();
      createWinCharacters();
      console.log("cleanCharacters");
      toggle();
    }
  }, [isGameOver]);

  useEffect(() => {
    createWinCharacters();
  }, [isGameStarted]);

  useEffect(() => {
    if (name !== "") {
      startGame();
    }
  }, []);

  const handleReplay = () => {
    cleanCharacters();
    replay();
    setRedirectToChooseCharacter(true);
  };

  const handleChangeRoom = () => {
    leftRoom();
    cleanCharacters();
    changeRoom();
    setRedirectToRooms(true);
  };

  const createWinCharacters = () => {
    function WinCharacter(name, image, winDescription) {
      this.name = name;
      this.image = image;
      this.winDescription = winDescription;
    }
    const winCharacterUser = new WinCharacter(
      userCharacter.name,
      userCharacter.image,
      userCharacter.winDescription
    );
    const winCharacterOpponent = new WinCharacter(
      opponentCharacter.name,
      opponentCharacter.image,
      opponentCharacter.winDescription
    );
    setWinCharacterUser(winCharacterUser);
    setWinCharacterOpponent(winCharacterOpponent);
  };

  console.log("Game Monitoring");
  varMonitoring();

  return (
    <div className="game">
      <div className="left-panel">
        <GameHeader sendEndGame={sendEndGame} changeRoom={changeRoom} />
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
          leftRoom={leftRoom}
        />
      </div>
      <Modal isOpen={modal} size="xl" centered={true}>
        <div className="winModal">
          <div className="winButtons">
            <span onClick={handleReplay} className="replay hover">
              Recommencer une partie
            </span>
            <span onClick={handleChangeRoom} className="changeRoom hover">
              Changer d'adversaire
            </span>
          </div>
          {winner && <h1>Tu as gagné contre {opponentName}!</h1>}
          {!winner && <h1>{opponentName} a gagné!</h1>}
          <div className="characters">
            {isGameOver && winCharacterUser && (
              <div className="user">
                <img src={winCharacterUser.image} alt={winCharacterUser.name} />
                <div className="winDescription">
                  {winCharacterUser.winDescription.map((m) => (
                    <p>{m}</p>
                  ))}
                </div>
              </div>
            )}
            {isGameOver && winCharacterOpponent.winDescription !== undefined && (
              <div className="opponent">
                <img
                  src={winCharacterOpponent.image}
                  alt={winCharacterOpponent.name}
                />
                <div className="winDescription">
                  {winCharacterOpponent.winDescription.map((m) => (
                    <p>{m}</p>
                  ))}
                </div>
              </div>
            )}
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
      {redirectToHome && <Redirect to="/" />}
    </div>
  );
};

export default Game;
