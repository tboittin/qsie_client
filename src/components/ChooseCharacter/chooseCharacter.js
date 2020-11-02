import React, { useEffect } from "react";
import Circles from "../Circles/circles";

import "./chooseCharacter.scss";

const ChooseCharacter = ({
  userCharacter,
  pickCharacter,
  characterPicked,
  opponentStillThere,
  name,
  joinRoom,
  visitor,
  creator,
  setScreen,
  redirectedToHome,
}) => {
  useEffect(() => {
    console.log(
      "useEffect chooseCharacter",
      "opponentStillThere",
      opponentStillThere
    );
    if (opponentStillThere === false) {
      setScreen("rooms");
    }
  }, [opponentStillThere]);

  useEffect(() => {
    if (visitor) {
      joinRoom();
    }
  }, []);

  useEffect(() => {
    if (name === "") {
      redirectedToHome();
    }
  }, []);

  useEffect(() => {
    pickCharacter();
  }, []);

  const handleCharacterPicked = () => {
    if (creator) {
      joinRoom();
    }
    characterPicked();
    setScreen("game");
  };

  console.log(userCharacter);

  return (
    <>
      <div className="choose-character-outer">
        <div className="choose-character-inner">
          <div className="text">
            <h1>Choisis le personnage que tu incarneras</h1>
            <button className="button" onClick={handleCharacterPicked}>
              Jouer
            </button>
          </div>
          <div className="personnage">
            {userCharacter.name}
            <img src={userCharacter.image} alt={userCharacter.name} />
            {userCharacter.description &&
              userCharacter.description.map((d) => (
                <span key={d.index} className="large-devices">{d}</span>
              ))}
            <p className="characterChange" onClick={pickCharacter}>
              Choisir un autre personnage
            </p>
          </div>
        </div>
        <Circles numberOfCircles={4} highlitedOne={3} />
      </div>
    </>
  );
};

export default ChooseCharacter;
