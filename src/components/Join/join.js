import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Circles from "../Circles/circles";

import "./join.scss";

const Join = ({ updateName, nameError }) => {
  const [joinName, setJoinName] = useState("");
  const [redirectToRoom, setRedirectToRoom] = useState(false);

  const goToRooms = (event) => {
    if (!joinName) {
      event.preventDefault();
      alert("Merci d'indiquer ton nom");
    } else {
      updateName(joinName);
      !nameError && handleRedirectToRoom();
    }
  };

  const handleRedirectToRoom = () => {
    setRedirectToRoom(true);
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
          onKeyUp={(event) => event.key === "Enter" && goToRooms(event)}
        />
        <button className="button" onClick={(event) => goToRooms(event)}>
          Prochaine étape
        </button>
        <p className="light">Les données ne sortent pas du jeu.</p>
        <Circles numberOfCircles={4} highlitedOne={1} />
      </div>
      {redirectToRoom && <Redirect to={"/rooms"} />}
    </>
  );
};

export default Join;
