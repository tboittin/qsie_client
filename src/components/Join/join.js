import React, { useState } from "react";
import { Redirect } from "react-router-dom";

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
      !nameError && setRedirectToRoom(true); // TODO réparer bug login même si problème de nom
    }
  };

  return (
    <>
      {!redirectToRoom && (
        <div className="join">
          <h1>Indique ton nom ou ton pseudo ici.</h1>
          <div>
            <input
              placeholder="Nom ou pseudo"
              className="joinInput"
              type="text"
              onChange={(event) => {
                setJoinName(event.target.value);
              }}
              onKeyUp={(event) => event.key === "Enter" && goToRooms(event)}
            />
          </div>
          <button className="button" onClick={(event) => goToRooms(event)}>
            Prochaine étape
          </button>
          <p className="light">Les données ne sortent pas du jeu.</p>
        </div>
      )}
      {redirectToRoom &&
        <Redirect to={"/rooms"} />
      }
    </>
  );
};

export default Join;
