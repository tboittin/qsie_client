import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Circles from "../Circles/circles";

import "./chooseCharacter.scss";

const ChooseCharacter = ({
  userCharacter,
  pickCharacter,
  characterPicked,
  varMonitoring,
  opponentStillThere,
}) => {
  // useEffect for picking character
  useEffect(() => {
    pickCharacter();
  }, []);

  console.log("chooseCharacter monitoring");
  varMonitoring();

  return (
    <>
      <div className="choose-character-outer">
        <div className="choose-character-inner">
          <div className="text">
            <h1>Choisis le personnage que tu incarneras</h1>
            <Link to={`/game`} onClick={characterPicked}>
              <button className="button">Jouer</button>
            </Link>
          </div>
          <div className="personnage">
            {userCharacter.name}
            <img src={userCharacter.image} alt={userCharacter.name} />
            <p className="characterChange" onClick={pickCharacter}>
              Choisir un autre personnage
            </p>
          </div>
        </div>
        <Circles numberOfCircles={4} highlitedOne={3} />
      </div>
      {!opponentStillThere && (
        <div>
          <Redirect to="/rooms" />
        </div>
      )}
    </>
  );
};

export default ChooseCharacter;
