import React, { useState } from "react";

import "./character.scss";
import { Modal } from "reactstrap";

import CharacterModal from "./CharacterModal/characterModal";

const Character = ({ character }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="character bg-white" onClick={toggle}>
        <p>{character.name}</p>
        <Modal
          key={"modal-" + character.name}
          isOpen={modal}
          toggle={toggle}
          size="xl"
        >
          <CharacterModal character={character} modal={modal} toggle={toggle} />
        </Modal>
      </div>
    </>
  );
};

export default Character;
