import React, { useState } from "react";

import "./character.scss";
import { Modal } from "reactstrap";

import CharacterModal from "./CharacterModal/characterModal";

const Character = ({ character, setWinner, setIsGameOver }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const characterDisplay = () => {
    switch (character.display) {
      case "wrong":
        return "display-wrong";
      case "innocent":
        return "display-innocent";
      default:
        return "";
    }
  };

  return (
    <>
      <div className={`character hover`} onClick={toggle}>
        <img src={character.image} alt={character.name} />
        <div className={`overlay ${characterDisplay()}`}></div>
        <p className="characterName">{character.name}</p>
        <Modal
          key={"modal-" + character.name}
          isOpen={modal}
          toggle={toggle}
          centered={true}
          size="xl"
        >
          <CharacterModal
            character={character}
            modal={modal}
            toggle={toggle}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
            displayButtons={true}
          />
        </Modal>
      </div>
    </>
  );
};

export default Character;
