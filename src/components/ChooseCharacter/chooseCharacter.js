import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

import "./chooseCharacter.scss";

const ChooseCharacter = ({ userCharacter, pickCharacter, characterPicked }) => {
  // useEffect for picking character
  useEffect(() => {
    pickCharacter();
  }, []);

  return (
    <div className="choose-character-outer">
      <div className="choose-character-inner">
        <div className="text">
          <h1>Choisis le personnage que tu incarneras</h1>
          <Link to={`/game`} onClick={characterPicked}>
            <button className="button">Jouer</button>
          </Link>
        </div>
        <div className="personnage">
          <p>{userCharacter.name}</p>
          <img src={userCharacter.image} alt={userCharacter.name} />
          <p className="characterChange" onClick={pickCharacter}>
            Choisir un autre personnage
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseCharacter;
