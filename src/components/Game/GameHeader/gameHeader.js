import React from "react";

import "./gameHeader.css";
import { Row, Col } from "reactstrap";

const GameHeader = () => (
    <Row className="game-header m-0">
        <Col xs="4" className="logo">QUI SONT-IELS?</Col>
        <Col xs={{size: '4', offset: '4'}} className="players">Players</Col>
    </Row>
);

export default GameHeader;
