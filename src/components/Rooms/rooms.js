import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import "./rooms.scss";

const { Modal } = require("reactstrap");

const Rooms = ({ name, room, rooms, getRooms, updateRoom, joinRoom }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [redirectToProximity, setRedirectToProximity] = useState(
    false
  );

  useEffect(() => {
    getRooms();
    console.log("rooms gotten");
  }, []);

  const roomInitiale = (roomName) => {
    let initiale = roomName.substring(0, 1);
    return initiale;
  };

  const handleJoinRoom = () => {
    joinRoom();
    setRedirectToProximity(true);
  };

  return (
    <>
      <div className="rooms">
        <h1>Choisis un.e partenaire de jeu</h1>
        <div className="rooms-list">
          {rooms.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                updateRoom(r.name);
                toggle();
              }}
            >
              <div className="initiale">{roomInitiale(r.name)}</div>
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
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <div className="rooms-modal">
          Veux-tu rejoindre le salon: {room} ?
          <button onClick={handleJoinRoom} className="button">Oui</button>
          <span onClick={toggle}>Non</span>
        </div>
      </Modal>

      {redirectToProximity && <Redirect to="/proximity" />}
    </>
  );
};

export default Rooms;
