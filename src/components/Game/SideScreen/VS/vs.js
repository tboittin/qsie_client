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
          <p className="charName">{opponentName}</p>
          <img
            className="opponent-img"
            src="./QSI_unknown.png"
            alt="adversaire"
          />
        </div>
        <div className="user hover">
          <p className="charName">
            {userCharacter.name} ({name})
          </p>
          <img
            src={userCharacter.image}
            alt={userCharacter.name}
            onClick={toggle}
          />
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
