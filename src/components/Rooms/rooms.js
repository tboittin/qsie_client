import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import "./rooms.scss";

const { Modal } = require("reactstrap");

const Rooms = ({
  name,
  room,
  rooms,
  getRooms,
  updateRoom,
  joinRoom,
  varMonitoring,
  opponentStillThere,
  redirected,
  setRedirected,
  redirectedToRooms,
  setOpponentStillThere,
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [redirectToProximity, setRedirectToProximity] = useState(false);

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    if (!opponentStillThere) {
      redirectedToRooms();
    }
  });

  const roomInitiale = (roomName) => {
    let initiale = roomName.substring(0, 1);
    return initiale;
  };

  const handleJoinRoom = () => {
    joinRoom();
    setRedirectToProximity(true);
  };

  console.log("Rooms monitoring");
  varMonitoring();

  const toggleRedirectedModal = () => {
    getRooms();
    setRedirected(false);
    setOpponentStillThere(true);
  };
  return (
    <>
      <div className="rooms">
        <h1>Choisis un.e partenaire de jeu</h1>
        <div className="rooms-list">
          {rooms.map((r) => (
            <div
              className="initiale hover"
              key={r.id}
              onClick={() => {
                updateRoom(r.name);
                toggle();
              }}
            >
              <span>{roomInitiale(r.name)}</span>
              <div className="subtitle">{r.name}</div>
            </div>
          ))}
        </div>
        <div className="own-room">
          <h1>Ou crée ton propre salon</h1>
          <button
            className="button"
            onClick={() => {
              updateRoom(name);
              toggle();
            }}
          >
            Créer son propre salon
          </button>
        </div>
        <div className="refresh">
          <img
            src="./change_icon.png"
            alt="actualiser la liste des joueurs"
            onClick={getRooms}
          />
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <div className="rooms-modal">
          <span>Veux-tu rejoindre le salon: {room} ?</span>
          <button onClick={handleJoinRoom} className="button-modal">
            Oui
          </button>
          <p className="hover" onClick={toggle}>Non</p>
        </div>
      </Modal>

      <Modal isOpen={redirected} toggle={toggleRedirectedModal} size="md">
        <div className="redirected">
          <p>
            Tu es revenu à l'écran des joueur car ton adversaire a quitté la
            partie
          </p>
        </div>
      </Modal>

      {redirectToProximity && <Redirect to="/proximity" />}
    </>
  );
};

export default Rooms;
