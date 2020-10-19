import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Circles from "../Circles/circles";

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
  setCreator,
  setVisitor,
  setIsGameOver,
}) => {
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  
  useEffect(() => {
    if (name === "") {
      setRedirectToHome(true);
    }
  }, [])

  const toggle = (status) => {
    if (modal === false) {
      setStatus(status)
      setModal(true)
    }
    setModal(!modal)
  };

  const [redirectToProximity, setRedirectToProximity] = useState(false);

  useEffect(() => {
    if (name !== ""){
    getRooms();
    }
  }, []);

  useEffect(() => {
    if (!opponentStillThere) {
      redirectedToRooms();
    }
  }, []);

  const roomInitiale = (roomName) => {
    let initiale = roomName.substring(0, 1);
    return initiale.toUpperCase();
  };

  const handleJoinRoom = () => {
    if (status === 'creator') {
      console.log('creator');
      setCreator(true);
    };
    if (status === 'visitor') {
      console.log('visitor');
      setVisitor(true);
    };
    joinRoom();
    setRedirectToProximity(true);
  };

  console.log("Rooms monitoring");
  varMonitoring();

  const toggleRedirectedModal = () => {
    getRooms();
    setRedirected(false);
    setIsGameOver(false); // DEV
    setOpponentStillThere(true);
  };
  return (
    <>
      <div className="rooms">
        <h1>Choisis un·e partenaire de jeu</h1>
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
          <h1
            className="button hover"
            onClick={() => {
              updateRoom(name);
              toggle();
            }}
          >
            Ou, crée une nouvelle partie
          </h1>
        </div>
        <div className="refresh hover" onClick={()=>getRooms()}>
          Rafraîchir pour faire apparaître des adversaires
        </div>
        <Circles numberOfCircles={4} highlitedOne={2} />
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <div className="rooms-modal">
          <span>Veux-tu rejoindre le salon: {room} ?</span>
          <button onClick={handleJoinRoom} className="button-modal">
            Oui
          </button>
          <p className="hover" onClick={toggle}>
            Non
          </p>
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

      {redirectToProximity && <Redirect to="/chooseCharacter" />}
      {redirectToHome && <Redirect to="/" />}
    </>
  );
};

export default Rooms;
