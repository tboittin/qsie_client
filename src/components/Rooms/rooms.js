import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
const { Container, Row, Col, Button } = require("reactstrap");

const Rooms = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState(["101", "Green Room"]);

  useEffect(() => {
    const { name } = queryString.parse(window.location.search);
    setName(name);
  }, [window.location.href]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            {rooms.map((room) => (
              <Link to={`chooseCharacter?name=${name}&room=${room}`} key={room}>
                <h1>{room}</h1>
              </Link>
            ))}
          </Col>
          <Col>
            <h1>Create a New Room</h1>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Link to={`chooseCharacter?name=${name}&room=${room}`}>
              <Button
                color="success"
                onSubmit={(room) => {
                  setRooms([...room]);
                  console.log(rooms);
                }}
              >
                Join the room
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rooms;
