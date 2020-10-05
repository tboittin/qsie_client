import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./rooms.scss";

const { Modal } = require("reactstrap");

const Rooms = ({
  name,
  room,
  rooms,
  getRooms,
  updateRoom,
  joinRoom
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getRooms(); //Remettre après design
    console.log("rooms gotten");
  }, []);

  const roomInitiale = (roomName) => {
    let initiale = roomName.substring(0, 1);
    return initiale;
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
          Voulez-vous rejoindre le salon: {room} ?
          <Link onClick={joinRoom} to={`chooseCharacter`}>
            <button className="button-green">Oui</button>
          </Link>
          <button onClick={toggle} className="button-red">Non</button>
        </div>
      </Modal>
    </>
  );
};

export default Rooms;
