import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import "./join.css";

const Join = ({ name, updateName }) => {
  const [joinName, setJoinName] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <Container>
          <h1>Bienvenue !</h1>
          <Row>
            <Col xs="8">
              <h1 className="heading">Description</h1>
              <p className="character-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Col>
            <Col xs="4">
              <h1>Indique ton nom</h1>
              <div>
                <input
                  placeholder="Name"
                  className="joinInput"
                  type="text"
                  onChange={(event) => {
                    setJoinName(event.target.value);
                  }}
                />
              </div>
              <Link
                to={`/rooms`}
                onClick={(event) =>
                  !name
                    ? event.preventDefault(
                        updateName(joinName)
                      )
                    : null
                }
              >
                <button className="button mt-20">Entrer</button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Join;
