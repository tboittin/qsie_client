import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

import "./chooseCharacter.scss";

const ChooseCharacter = ({
  userCharacter,
  pickCharacter,
  characterPicked
}) => {

  
  // useEffect for picking character
  useEffect(() => {
    pickCharacter();
  }, []);
  
  // useEffect(() => {
  //   console.log("props");
  //   console.log(props);
  // }, [props]);

  return (
    <Container>
      <Row>
        <Col xs="4">{userCharacter.name}</Col>
        <Col xs={{ size: "7", offset: "1" }} className="modal-menu">
          <p className="character-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <Button color="warning" onClick={pickCharacter}>
            Je veux un autre personnage !
          </Button>

          <Link to={`/game`} onClick={characterPicked}>
            <Button
              color="success"
            >
              Je valide ce personnage
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ChooseCharacter;
