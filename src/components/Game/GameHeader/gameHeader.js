import React, { useState } from "react";
import { Modal } from "reactstrap";

import "./gameHeader.scss";

const GameHeader = ({ sendEndGame, changeRoom }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="game-header" onClick={toggle}>
        <div className="logo hover">QUI SONT-IELS?</div>
      </div>
      <Modal isOpen={modal} size="xl" centered={true} toggle={toggle}>
        <div className="rules-modal">
          <h1>Principes</h1>
          <p>
            Le but du jeu est de découvrir le personnage de ton adversaire en
            lui posant des questions sur celui-ci.
          </p>
          <p>
            En fonction de ses réponses, tu pourras avancer par déduction
            jusqu’à n’avoir plus qu’un personnage.
          </p>
          <p>
            Pour pouvoir en savoir plus sur chaque personnage et pour pouvoir
            les éliminer ou les choisir, il te suffit de cliquer sur chaque
            image.
          </p>
          <p>
            En fonction de si ton adversaire se trouve à tes côtés ou à
            distance, tu peux activer ou désactiver le chat.
          </p>
          <p>
            Pour ne pas donner d’indices sur le genre pendant la partie, iel est
            utilisé comme pronom pour tous les personnages.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default GameHeader;
