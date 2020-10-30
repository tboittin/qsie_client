import React, { useEffect, useState } from "react";

import "./game.scss";

import GameHeader from "./GameHeader/gameHeader";
import { Modal } from "reactstrap";
import GameGrid from "./GameGrid/gameGrid";
import SideScreen from "./SideScreen/sideScreen";
import Spielact from "./Spielact/spielact";

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
  opponentStillThere,
  startGame,
  cleanCharacters,
  leftRoom,
  setScreen,
  redirectedToHome,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [winCharacterUser, setWinCharacterUser] = useState({});
  const [winCharacterOpponent, setWinCharacterOpponent] = useState({});

  useEffect(() => {
    if (name === "") {
      redirectedToHome()
    }
  }, []);


  useEffect(() => {
    console.log('useEffect game', 'opponentStillThere', opponentStillThere);
    if (opponentStillThere === false) {
      setScreen('rooms')
    }
  }, [opponentStillThere])

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
    setScreen('chooseCharacter');
  };

  const handleChangeRoom = () => {
    // sendEndGame();
    leftRoom();
    cleanCharacters();
    changeRoom();
    setScreen('rooms');
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
      opponentCharacter.name,// TODO résoudre le problème de Lara
      opponentCharacter.image,
      opponentCharacter.winDescription
    );
    setWinCharacterUser(winCharacterUser);
    setWinCharacterOpponent(winCharacterOpponent);
  };

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
        <Spielact />
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
                    <p key={m.index}>{m}</p>
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
                    <p key={m.index}>{m}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
