import React, { useState } from "react";
import { Redirect } from "react-router";

const Proximity = ({ setProximity }) => {
  const [redirectToChooseCharacter, setRedirectToChooseCharacter] = useState(
    false
  );

  const handleRedirectToChooseCharacter = () => {
    setRedirectToChooseCharacter(true);
  };

  const setProximityToDistance = () => {
    setProximity("distance");
    handleRedirectToChooseCharacter();
  };

  const setProximityToProximity = () => {
    setProximity("proximity");
    handleRedirectToChooseCharacter();
  };

  return (
    <>
      <div className="proximity">
          <h1>Votre partenaire de jeu se trouve</h1>
          <button className="button" onClick={setProximityToDistance}>
            À distance
          </button>
          <button className="button" onClick={setProximityToProximity}>
            À proximité
          </button>
      </div>
      {redirectToChooseCharacter && (
        <div>
          <Redirect to="/chooseCharacter" />
        </div>
      )}
    </>
  );
};

export default Proximity;
