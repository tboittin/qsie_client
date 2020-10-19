import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from "socket.io-client";

import Join from "./components/Join/join";
import Game from "./components/Game/game";
import Home from "./components/Home/home";
import Rules from "./components/Rules/rules";
import ChooseCharacter from "./components/ChooseCharacter/chooseCharacter";
import Rooms from "./components/Rooms/rooms";

// import * as CHARACTERS from "./characters.json";
import * as CHARACTERS from "./character_min.json";

let socket;

const App = () => {
  const ENDPOINT = "http://localhost:5000/";
  // const ENDPOINT = "https://qsie-server.herokuapp.com/";
  const characters = [...CHARACTERS.default];
  
  const [name, setName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [userCharacter, setUserCharacter] = useState({});
  const [opponentCharacter, setOpponentCharacter] = useState({});
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [opponentStillThere, setOpponentStillThere] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const [creator, setCreator] = useState(false);
  const [visitor, setVisitor] = useState(false);

  const varMonitoring = () => {
    console.log('isGameStarted: ', isGameStarted);
    console.log('isGameOver: ', isGameOver);
    console.log('winner: ', winner);
    console.log('creator:', creator)
    console.log('visitor:', visitor)
  }

  const cleanCharacters = () => {
    setUserCharacter({});
    setOpponentCharacter({});
    for (let i = 0; i < characters.length; i++) {
      characters[i].display = "unknown";
      characters[i].opponentCharacter = "false";
    }
  };

  // Dans Join
  // // updateName: ajouter le joueur dans le back & vérifier que son nom n'est pas déjà pris + déconnecter quand l'user quitte la page
  const updateName = (name) => {
    setName(name);
    socket.emit("login", { name }, (error) => { //
      alert(error);
      setNameError(true);
    });

    // Unmount part
    return () => {
      socket.emit("disconnect", {name, room});

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
    if (room === name) {
      setCreator(true);
    } else {
      setVisitor(true);
    };
  };

  // // rejoint la room
  const joinRoom = () => {
    socket.emit("joinRoom", { name, room }, (error) => {
      alert(error);
    });
  };

  const isCreator = () => {
    console.log('isCreator');
    setVisitor(false);
    setCreator(true);
  }

  const isVisitor = () => {
    console.log('isVisitor');
    setCreator(false);
    setVisitor(true);
  }

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
    socket.emit("characterPicked", {
      name,
      clientCharacter: userCharacter,
      room,
    });
  };

  // Game

  const startGame = () => {
    socket.emit("startGame", {
      name,
      clientCharacter: userCharacter,
      room,
    })
  }
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
    socket.emit("sendEndGame", room);
  };

  // WinScreen

  // Replay
  const replay = () => {
    setWinner(false);
    setIsGameOver(false);
    setIsGameStarted(false);
    socket.emit("replay");
  };
  // // retourne à l'écran de choix des rooms et supprime la value de room
  const changeRoom = () => {
    setMessages([]);
    setRoom("");
    setWinner(false);
    setIsGameOver(false);
    setIsGameStarted(false);
    socket.emit("changeRoom", room);
  };

  const redirectedToRooms = () => {
    socket.emit("redirectedToRooms", room);
    setMessages([]);
    setRoom("");
    setWinner(false);
    setIsGameOver(false);
    setIsGameStarted(false);
    setRedirected(true);
  }

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
  }, [opponentCharacter]);

  useEffect(()=> {
    socket.on("redirectToRooms", () => {
      setOpponentStillThere(false);
    })
  })

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
            setRoom={setRoom}
            rooms={rooms}
            // nameError={nameError}
            getRooms={getRooms}
            updateRoom={updateRoom}
            joinRoom={joinRoom}
            varMonitoring={varMonitoring} // Delete after tests
            opponentStillThere={opponentStillThere}
            redirected={redirected}
            setRedirected={setRedirected}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
            setIsGameStarted={setIsGameStarted}
            redirectedToRooms={redirectedToRooms}
            setOpponentStillThere={setOpponentStillThere}
            isCreator = {isCreator}
            isVisitor = {isVisitor}
          />
        </Route>
        <Route path="/chooseCharacter">
          <ChooseCharacter
            userCharacter={userCharacter}
            pickCharacter={pickCharacter}
            characterPicked={characterPicked}
            varMonitoring={varMonitoring} // Delete after tests
            opponentStillThere={opponentStillThere}
            creator={creator}
            visitor={visitor}
            name={name}
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
            changeRoom={changeRoom}
            replay={replay}
            getUsersInRoom={getUsersInRoom}
            setMessage={setMessage}
            sendMessage={sendMessage}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
            sendEndGame={sendEndGame}
            varMonitoring={varMonitoring} // Delete after tests
            opponentStillThere={opponentStillThere}
            creator={creator}
            visitor={visitor}
            startGame={startGame}
            setIsGameStarted={setIsGameStarted}
            cleanCharacters={cleanCharacters}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
