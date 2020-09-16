import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

import "./chooseCharacter.scss";

import * as CHARACTER from "../../characters.json";
// import { socket } from "socket.io-client";

const ChooseCharacter = ({ location }) => {
  
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [userCharacter, setUserCharacter] = useState({});

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
  }, [window.location.href]);

  const pickCharacter = () => {
    let i = Math.floor(Math.random() * CHARACTER.default.length);
    const userCharacter = CHARACTER.default[i];
    userCharacter.opponentCharacter = true;
    setUserCharacter(userCharacter);
  };
  
  useEffect(() => {
    pickCharacter();
  });

  // const validateCharacter = (userCharacter) => {
  //   socket.emit('validate character', {userCharacter}, ()=>{})
  // }

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

          <Link to={`/game?name=${name}&room=${room}`}>
            <Button color="success" 
            // onClick={validateCharacter}
            >Je valide ce personnage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ChooseCharacter;
