import React, { useState } from "react";
import { Modal } from "reactstrap";

import "./surrender.scss";

const Surrender = ({ handleChangeRoom, sendEndGame }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const handleSurrender = () => {
      sendEndGame(true);
      handleChangeRoom();
  }
  return (
    <>
      <div className="surrender hover" onClick={toggle}>
        Abandonner la partie
      </div>
      <Modal isOpen={modal} size="lg" centered={true} toggle={toggle}>
        <div className="surrenderModal">
          <span>Es-tu sûr de vouloir abandonner la partie ?</span>
          <button className="button-modal" onClick={toggle}>
            Non, je veux continuer à jouer
          </button>
          <p className="hover" onClick={handleSurrender}>
            Oui, je veux retourner à l'écran des joueurs
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Surrender;
