import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "reactstrap/lib/Button";

const WinScreen = ({ opponentName, winner, replay, changeRoom }) => {
  return (
    <div>
      <h1>Le jeu est terminé !</h1>
      {winner &&
        <h2>Vous avez gagné</h2>
      }
      {!winner &&
        <h2>{opponentName} a gagné</h2>
      }
      <Link onClick={replay()} to={`game`}>
        <Button color="success">Rejouer</Button>
      </Link>
      <Link onClick={changeRoom()} to={`room`}>
        <Button color="warning">Changer de salon</Button>
      </Link>
    </div>
  );
};

export default WinScreen;