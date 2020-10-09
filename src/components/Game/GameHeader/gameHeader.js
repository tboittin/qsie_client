import React, { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "reactstrap";

import "./gameHeader.scss";

const GameHeader = () => {
  const [home, setHome] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const goBackToHome = () => {
    toggle();
    setHome(true);
  };
  return (
    <>
      <div className="game-header" onClick={toggle}>
        <div className="logo hover">QUI SONT-IELS?</div>
      </div>
      <Modal isOpen={modal} size="md" centered={true} toggle={toggle}>
        <div className="modalHeader">
          <h1>Es-tu sûr de vouloir revenir à l'écran d'accueil ?</h1>
          <button className="button" onClick={goBackToHome}>
            Oui, je suis sûr
          </button>
          <p className="hover" onClick={toggle}>
            Non, je veux revenir au jeu
          </p>
        </div>
      </Modal>
      {home && <Redirect to="/" />}
    </>
  );
};

export default GameHeader;
