import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Socket } from "socket.io-client";
const { Container, Row, Col, Button, Modal } = require("reactstrap");

const Rooms = ({ name, room, rooms, getRooms, updateRoom, joinRoom }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getRooms();
    console.log('rooms gotten');
  }, []);

  console.log(rooms);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            {rooms.map((r) => (
              <Button
                key={r.id}
                onClick={() => {
                  updateRoom(r.name);
                  toggle();
                }}
              >
                {r.name}
              </Button>
            ))}
          </Col>
          <Col>
            <Button
              color="success"
              onClick={() => {
                updateRoom(name);
                toggle();
              }}
            >
              Créer son propre salon
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle} size="md">
        Voulez-vous rejoindre le salon: {room} ?
        <Link onClick={joinRoom} to={`chooseCharacter`}>
          <Button color="success">Oui</Button>
        </Link>
        <Button color="danger">Non</Button>
      </Modal>
    </div>
  );
};

export default Rooms;
