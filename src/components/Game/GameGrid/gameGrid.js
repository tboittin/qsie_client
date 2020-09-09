import React, { useState } from "react";

import "./gameGrid.scss";
import Character from "./Character/character";
import CharacterModal from "./CharacterModal/characterModal";
import { Modal } from "reactstrap";

const GameGrid = () => {
  const characters = [
    {name: "1"},
    {name: "2"},
    {name: "3"},
    {name: "4"},
    {name: "5"},
    {name: "6"},
    {name: "7"},
    {name: "8"},
    {name: "9"},
    {name: "10"},
    {name: "11"},
    {name: "12"},
    {name: "13"},
    {name: "14"},
    {name: "15"},
    {name: "16"},
    {name: "17"},
    {name: "18"},
    {name: "19"},
    {name: "20"},
  ];
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="grid">
      {characters.map(character=>(
        <>
          <div className="character bg-white" key={character.name} onClick={toggle}>
            <Character character={character}/>
          </div>
          <Modal isOpen={modal} toggle={toggle} size="xl">
            <CharacterModal character={character} modal={modal} toggle={toggle} />
          </Modal>
        </>
      ))}
    </div>
  )
};

export default GameGrid;
