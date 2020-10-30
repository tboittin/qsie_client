import React, { useState } from "react";
import { Modal } from "reactstrap";
import Circles from "../Circles/circles";

import "./join.scss";

const Join = ({ checkIfUserExists, updateName, nameError, setScreen }) => {
  const [joinName, setJoinName] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
  };

  const blockEmptyName = (event) => {
    event.preventDefault();
    alert("Merci d'indiquer ton nom");
  };

  const sameName = (event) => {
    event.preventDefault();
    alert("Ce nom a déjà été pris, merci d'en choisir un autre");
  };

  const goToRooms = (event) => {
    if (nameError) {
      sameName(event);
      toggle();
    } else {
      updateName(joinName);
      handleRedirectToRoom();
    }
  };

  const handleRedirectToRoom = () => {
    setScreen("rooms");
  };

  const handleClick = (event) => {
    if (!joinName) {
      blockEmptyName(event);
    } else {
      checkIfUserExists(joinName);
      toggle();
    };
  };

  return (
    <>
      <div className="join">
        <h1>Indique ton nom ou ton pseudo ici.</h1>
        <input
          placeholder="Nom ou pseudo"
          className="joinInput"
          type="text"
          onChange={(event) => {
            setJoinName(event.target.value);
          }}
          onKeyUp={(event) => event.key === "Enter" && handleClick(event)}
        />
        <button className="button" onClick={(event) => handleClick(event)}>
          Prochaine étape
        </button>
        <p className="light">Les données ne sortent pas du jeu.</p>
        <Circles numberOfCircles={4} highlitedOne={1} />
      </div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <span>Veux-tu t'appeler {joinName} ?</span>
        <button
            onClick={(event) => goToRooms(event)}
            className="button-modal"
          >
            Oui
          </button>
          <p className="hover" onClick={toggle}>
            Non
          </p>
      </Modal>
    </>
  );
};

export default Join;
