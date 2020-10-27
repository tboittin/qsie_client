import React, { useEffect, useState } from "react";
import Circles from "../Circles/circles";

import "./rooms.scss";

const { Modal } = require("reactstrap");

const Rooms = ({
  name,
  room,
  rooms,
  getRooms,
  updateRoom,
  opponentStillThere,
  redirected,
  setRedirected,
  redirectedToRooms,
  setOpponentStillThere,
  setIsGameOver,
  leftTheGame,
  setLeftTheGame,
  setVisitor,
  setCreator,
  setScreen
}) => {
  const [modal, setModal] = useState(false);
  
  const isVisitor = () => {
    setCreator(false);
    setVisitor(true);
  };

  const isCreator = () => {
    setVisitor(false);
    setCreator(true);
  };

  const roomInitiale = (roomName) => {
    let initiale = roomName.substring(0, 1);
    return initiale.toUpperCase();
  };

  const toggleRedirectedModal = () => {
    getRooms();
    setRedirected(false);
    setIsGameOver(false);
    setOpponentStillThere(true);
  };

  const toggleLeaveModal = () => {
    getRooms();
    setLeftTheGame(false);
  };

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (name !== "") {
      console.log('getting rooms');
      getRooms();
    }
  }, []);

  useEffect(() => {
    if (!opponentStillThere) {
      redirectedToRooms();
    }
  }, []);

  useEffect(() => {
    if (name === "") {
      setScreen('home')
    }
  }, []);

  return (
    <>
      <div className="rooms">
        <h1>Choisis un·e partenaire de jeu</h1>
        <div className="rooms-list">
          {rooms
            .filter((r) => r !== name.trim().toLowerCase())
            .map((r) => (
              <div
                className="initiale hover"
                key={r.id}
                onClick={() => {
                  updateRoom(r.name);
                  isVisitor();
                  toggle();
                }}
              >
                <div className="circle">
                  <span>{roomInitiale(r.name)}</span>
                </div>
                <div className="subtitle">{r.name}</div>
              </div>
            ))}
        </div>
        <div className="own-room">
          <h1
            className="button hover"
            onClick={() => {
              updateRoom(name);
              isCreator();
              toggle();
            }}
          >
            Ou, crée une nouvelle partie
          </h1>
        </div>
        <div className="refresh hover" onClick={() => getRooms()}>
          Rafraîchir pour faire apparaître des adversaires
        </div>
        <Circles numberOfCircles={4} highlitedOne={2} />
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <div className="rooms-modal">
          <span>Veux-tu rejoindre le salon: {room} ?</span>
          <button onClick={() => setScreen('chooseCharacter')} className="button-modal">
            Oui
          </button>
          <p className="hover" onClick={toggle}>
            Non
          </p>
        </div>
      </Modal>

      <Modal isOpen={leftTheGame} toggle={toggleLeaveModal} size="md">
        <div className="redirected">
          <p>Tu es revenu à l'écran des joueurs.</p>
        </div>
      </Modal>

      <Modal isOpen={redirected} toggle={toggleRedirectedModal} size="md">
        <div className="redirected">
          <p>
            Tu es revenu à l'écran des joueur car ton adversaire a quitté la
            partie.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Rooms;
