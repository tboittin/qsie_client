import React, { useState } from "react";
import Modal from "reactstrap/lib/Modal";
import CharacterModal from "../../GameGrid/Character/CharacterModal/characterModal";

import "./vs.scss";

const VS = ({ name, opponentName, userCharacter, chat }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <div className={`${chat ? "vs" : "vs-withoutChat"}`}>
        <div className="opponent hover">
          <img
            className="opponent-img"
            src="./QSI_unknown.png"
            alt="adversaire"
          />
          <p className="charName">{opponentName}</p>
        </div>
        <div className="user hover">
          <img
            src={userCharacter.image}
            alt={userCharacter.name}
            onClick={toggle}
          />
          <p className="charName">
            {userCharacter.name} ({name})
          </p>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} size="xl">
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
