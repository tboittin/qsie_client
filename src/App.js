import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from "socket.io-client";

import Join from "./components/Join/join";
import Game from "./components/Game/game";
import Home from "./components/Home/home";
import Rules from "./components/Rules/rules";
import ChooseCharacter from "./components/ChooseCharacter/chooseCharacter";
import Rooms from "./components/Rooms/rooms";

import * as CHARACTERS from "./characters.json";
import Proximity from "./components/Proximity/proximity";

let socket;

const App = () => {
  const ENDPOINT = "http://localhost:5000/";
  // const ENDPOINT = "https://qsie-server.herokuapp.com/";
  const characters = [...CHARACTERS.default];
  const [name, setName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([
    // { id: 0, name: "Green Room", numberOfPlayers: 0 },
    // { id: 1, name: "Red Room", numberOfPlayers: 0 },
  ]);
  const [userCharacter, setUserCharacter] = useState({});
  const [opponentCharacter, setOpponentCharacter] = useState({});
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [proximity, setProximity] = useState("distance");
  const [nameError, setNameError] = useState(false);

  const cleanCharacters = () => {
    setUserCharacter({});
    setOpponentCharacter({});
  };

  // Dans Join
  // // updateName: ajouter le joueur dans le back & vérifier que son nom n'est pas déjà pris + déconnecter quand l'user quitte la page
  const updateName = (name) => {
    setName(name);
    socket.emit("login", { name }, (error) => {
      alert(error);
      setNameError(true);
    });

    // Unmount part
    return () => {
      socket.emit("disconnect"); // TODO abandonner s'il est en game

      socket.off();
    };
  };

  // Dans Room
  // // recevoir les rooms pour les afficher -useEffect
  const getRooms = () => {
    socket.emit("getRooms");
  };

  // // ajouter la room créée dans le state
  const updateRoom = (room) => {
    setRoom(room);
  };

  // // rejoint la room
  const joinRoom = () => {
    socket.emit("joinRoom", { name, room }, (error) => {
      alert(error);
    });
    console.log(`${name} joined ${room}`);
  };

  // Dans chooseCharacter
  // // choisir aléatoirement un personnage dans la liste et le positionner en tant que userCharacter -useEffect
  const pickCharacter = () => {
    let charactersCopy = [...CHARACTERS.default];
    let i = Math.floor(Math.random() * charactersCopy.length);
    let character = charactersCopy[i];
    character.opponentCharacter = true;
    setUserCharacter(character);
  };

  const characterPicked = () => {
    console.log(`${userCharacter.name} picked in ${room}`);
    socket.emit("characterPicked", {
      name,
      clientCharacter: userCharacter,
      room,
    });
  };

  // Game
  // // reçoit les joueurs dans la Room
  const getUsersInRoom = () => {
    socket.on("usersInRoom", (users) => {
      console.log(users);
    });
  };

  // // envoie un message au socket
  const sendMessage = (event) => {
    if (message) {
      event.preventDefault();
      socket.emit("sendMessage", { message, room, name });
      setMessage('');
    }
  };

  // // provoque la fin de la partie et supprime les joueurs choisis par les deux joueurs -useEffect
  const sendEndGame = () => {
    cleanCharacters();
    socket.emit("sendEndGame", room);
  };

  // WinScreen
  // // retourne à l'écran de choix des rooms et supprime la value de room
  const changeRoom = () => {
    console.log("changeRoom");
    setRoom("");
    socket.emit("changeRoom"); //TODO
  };

  // Replay
  const replay = () => {
    console.log("replay");
    socket.emit("replay"); //TODO
  };

  // useEffect for socket
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [setRooms, rooms]);

  useEffect(() => {
    socket.on("startGame", ({ opponentName, opponentCharacter }) => {
      setOpponentName(opponentName);
      setOpponentCharacter(opponentCharacter);
      setIsGameStarted(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("endGame", () => {
      setIsGameOver(true);
    });
  }, []);

  useEffect(() => {
    socket.on("users", (users) => {
      console.log(users);
    });
  }, []);

  useEffect(() => {
    getUsersInRoom();
  }, []);

  useEffect(() => {
    console.log(opponentCharacter);
  }, [opponentCharacter]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
        <Route path="/join">
          <Join updateName={updateName} nameError={nameError} />
        </Route>
        <Route path="/rooms">
          <Rooms
            name={name}
            room={room}
            rooms={rooms}
            // nameError={nameError}
            getRooms={getRooms}
            updateRoom={updateRoom}
            joinRoom={joinRoom}
          />
        </Route>
        <Route path="/proximity">
          <Proximity setProximity={setProximity} />
        </Route>
        <Route path="/chooseCharacter">
          <ChooseCharacter
            userCharacter={userCharacter}
            pickCharacter={pickCharacter}
            characterPicked={characterPicked}
          />
        </Route>
        <Route path="/game">
          <Game
            name={name} // TODO fenêtre attente du 2e joueur
            room={room}
            userCharacter={userCharacter}
            opponentName={opponentName}
            opponentCharacter={opponentCharacter}
            characters={characters}
            message={message}
            messages={messages}
            isGameStarted={isGameStarted}
            isGameOver={isGameOver} //TODO
            winner={winner}
            proximity={proximity}
            changeRoom={changeRoom}
            replay={replay}
            getUsersInRoom={getUsersInRoom}
            setMessage={setMessage}
            sendMessage={sendMessage}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
            sendEndGame={sendEndGame}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
