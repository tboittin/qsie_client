import React from "react";

import "./characterModal.scss";
import {
  ModalFooter,
  Button,
  ModalBody,
  Container,
  Row,
  Col,
} from "reactstrap";

const CharacterModal = ({ character, toggle }) => {
  const elimination = () => alert("Ce personnage est éliminé");

  const choixFinal = () => alert("Ce personnage est choisi comme choix final");
  return (
    <>
      <ModalBody>
        <Container>
          <Row>
            <Col xs="4">{character.name}</Col>
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
                Elimination
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