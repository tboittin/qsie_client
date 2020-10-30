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
  setScreen,
  redirectedToHome,
  getRoomLength,
  roomLength,
  setRoomLength,
  visitor,
  creator,
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
      getRooms();
    }
  }, [setScreen]);

  useEffect(() => {
    if (!opponentStillThere) {
      redirectedToRooms();
    }
  }, [setScreen]);

  useEffect(() => {
    if (name === "") {
      redirectedToHome();
    }
  }, [setScreen]);

  const goToChooseCharacter = (event, room) => {
    if (visitor) {
      if (roomLength) {
        if (roomLength !== 1) {
          event.preventDefault();
          toggle();
          alert(
            "Ce joueur a déjà un·e adversaire, choisis-en un·e autre ou crée une nouvelle partie."
          );
          getRooms();
          setRoomLength("");
        } else {
          setScreen("chooseCharacter");
          setRoomLength("");
        }
      }
    }

    if (creator) {
      setScreen("chooseCharacter");
      setRoomLength("");
    }
  };

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
                  isVisitor();
                  updateRoom(r.name);
                  getRoomLength(r.name);
                  toggle("visitorLink", r.name);
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
              isCreator();
              updateRoom(name);
              toggle("creatorLink", name);
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
          {visitor &&
            <span>Veux-tu jouer avec {room} ?</span>
          }
          {creator &&
            <span>Veux-tu lancer ta propre partie ?</span>
          }
          <button
            onClick={(event) => goToChooseCharacter(event, room)}
            className="button-modal"
          >
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
