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
        <div className="user">
          <img
            src={userCharacter.image}
            alt={userCharacter.name}
            onClick={toggle}
          />
          <p className="charName">{userCharacter.name} ({name})</p>
        </div>
        <div className="opponent">
          <p>
            
          </p><p className="charName">{opponentName}</p>
        </div>
      </div>
      <Modal
       isOpen={modal}
       toggle={toggle}
       size="xl"
      >
        <CharacterModal
          character={userCharacter}
          modal={modal}
          toggle={toggle}
          displayButtons={false}
        />
      </Modal>
    </>
  );
};

export default VS;
