import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./join.scss";

const Join = ({ name, updateName }) => {
  const [joinName, setJoinName] = useState("");

  return (
    <div className="join">
      <h1>Indique ton nom ou ton pseudo ici.</h1>
      <div>
        <input
          placeholder="Name"
          className="joinInput"
          type="text"
          onChange={(event) => {
            setJoinName(event.target.value);
          }}
        />
      </div>
      <Link
        to={`/rooms`}
        onClick={(event) =>
          !name ? event.preventDefault(updateName(joinName)) : null
        }
      >
        <button className="button">Entrer</button>
      </Link>
      <p className="lightblue">Les données ne sortent pas du jeu.</p>
    </div>
  );
};

export default Join;
