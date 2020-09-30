import React, { useState } from "react";

import "./gameHeader.css";
import { Row, Col } from "reactstrap";
import Modal from "reactstrap/lib/Modal";
import CharacterModal from "../GameGrid/Character/CharacterModal/characterModal";

const GameHeader = ({ name, opponentName, userCharacter }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <Row className="game-header m-0">
      <Col xs="4" className="logo">
        QUI SONT-IELS?
      </Col>
      <Col xs={{ size: "4", offset: "4" }} className="players">
        <div>
          <img
            src={userCharacter.image}
            alt={userCharacter.name}
            onClick={toggle}
          />
          <h4>{name}</h4>
        </div>
        VS
        <div>
          ?<h4>{opponentName}</h4>
        </div>
      </Col>
      <Modal>
        <CharacterModal
          character={userCharacter}
          modal={modal}
          toggle={toggle}
        />
      </Modal>
    </Row>
  );
};

export default GameHeader;
