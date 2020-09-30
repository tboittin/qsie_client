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
        break;
      case "innocent":
        return "display-innocent";
        break;
      default:
        return "";
        break;
    }
  };

  return (
    <>
      <div
        className={`character bg-white ${characterDisplay()}`}
        onClick={toggle}
      >
        <p>{character.name}</p>
        <Modal
          key={"modal-" + character.name}
          isOpen={modal}
          toggle={toggle}
          size="xl"
        >
          <CharacterModal
            character={character}
            modal={modal}
            toggle={toggle}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
          />
        </Modal>
      </div>
    </>
  );
};

export default Character;
