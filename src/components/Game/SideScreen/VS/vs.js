import React, { useState } from "react";
import Modal from "reactstrap/lib/Modal";
import CharacterModal from "../../GameGrid/Character/CharacterModal/characterModal";

import "./vs.scss";

const VS = ({ name, opponentName, userCharacter }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <div className="vs">
        <div className="opponent">
          <img
            src={userCharacter.image}
            alt={userCharacter.name}
            onClick={toggle}
          />
          <h4>{name}</h4>
        </div>
        <div className="user">
          ?<h4>{opponentName}</h4>
        </div>
      </div>
      <Modal>
        <CharacterModal
          character={userCharacter}
          modal={modal}
          toggle={toggle}
        />
      </Modal>
    </>
  );
};

export default VS;
