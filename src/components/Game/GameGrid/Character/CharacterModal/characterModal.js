import React, { useEffect, useState } from "react";
import queryString from "query-string";

import "./characterModal.scss";
import {
  ModalFooter,
  Button,
  ModalBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Redirect } from "react-router";

const CharacterModal = ({ character, toggle }) => {
  
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [win, setWin] = useState(false);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
  },[window.location.search]);

  const elimination = () => {
    toggle();
    character.display = 'innocent';
  };

  const choixFinal = () => {
    toggle();
    if (character.opponentCharacter === true) {
      alert("GAGNE")
      setWin(true)
    } else {
      character.display = 'wrong';
      return alert("Ce n'était pas le bon personnage");
    }
  };

  if (win) {
    return <Redirect to={`/winScreen?name=${name}&room=${room}`} />
  }
  
  return (
    <>
      <ModalBody>
        <Container>
          <Row>
            <Col xs="4">
              <h2>
                {character.name}
              </h2>
            </Col>
            <Col xs={{ size: "7", offset: "1" }} className="modal-menu">
              <p className="character-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <Button
                className="modal-button"
                color="danger"
                onClick={elimination}
              >
                Désactiver le personnage
              </Button>
              
              <Button
                className="modal-button"
                color="success"
                onClick={choixFinal}
              >
                Choix Final
              </Button>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Revenir au jeu
        </Button>
      </ModalFooter>
    </>
  );
};

export default CharacterModal;
