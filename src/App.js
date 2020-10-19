import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from "socket.io-client";

import Join from "./components/Join/join";
import Game from "./components/Game/game";
import Home from "./components/Home/home";
import Rules from "./components/Rules/rules";
import ChooseCharacter from "./components/ChooseCharacter/chooseCharacter";
import Rooms from "./components/Rooms/rooms";

import * as CHARACTERS from "./character_min.json";

let socket;

const App = () => {
  const ENDPOINT = "https://qsie-server.herokuapp.com/";
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
  const [leftTheGame, setLeftTheGame] = useState(false);

  // Nettoyage des personnages attribués aux joueurs + nettoyage de l'affichage des personnages entre les parties
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
    socket.emit("login", { name }, (error) => {
      //
      alert(error);
      setNameError(true);
    });

    // Unmount part
    return () => {
      socket.emit("disconnect", { name, room });

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

  // Emission du personnage vers le serveur
  const characterPicked = () => {
    socket.emit("characterPicked", {
      name,
      clientCharacter: userCharacter,
      room,
    });
  };

  // Game
  // Emet startGame lorsqu'on arrive dans le salon, le premier joueur à émettre startGame ne provoque pas de réponse server car il doit attendre le second
  // // le second joueur à emettre startGame lance la partie pour les deux joueurs
  const startGame = () => {
    socket.emit("startGame", {
      name,
      clientCharacter: userCharacter,
      room,
    });
  };
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
      setMessage("");
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

  // Affiche une popup lorsqu'on est éjecté de la partie
  const redirectedToRooms = () => {
    socket.emit("redirectedToRooms", room);
    setMessages([]);
    setRoom("");
    setWinner(false);
    setIsGameOver(false);
    setIsGameStarted(false);
    setRedirected(true);
  };

  // Affiche une popup lorsqu'on quitte la partie
  // // sert principalement à corriger la liste des rooms: l'adversaire est toujours dans la room à l'affichage de la popup
  // // la liste des rooms est rafraichie en fermant la popup et on se retrouve avec une liste correcte
  const leftRoom = () => {
    setLeftTheGame(true);
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

  useEffect(() => {}, [opponentCharacter]);

  useEffect(() => {
    socket.on("redirectToRooms", () => {
      setOpponentStillThere(false);
    });
  });

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
            getRooms={getRooms}
            updateRoom={updateRoom}
            joinRoom={joinRoom}
            opponentStillThere={opponentStillThere}
            redirected={redirected}
            setRedirected={setRedirected}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
            setIsGameStarted={setIsGameStarted}
            redirectedToRooms={redirectedToRooms}
            setOpponentStillThere={setOpponentStillThere}
            leftTheGame={leftTheGame}
            setLeftTheGame={setLeftTheGame}
          />
        </Route>
        <Route path="/chooseCharacter">
          <ChooseCharacter
            userCharacter={userCharacter}
            pickCharacter={pickCharacter}
            characterPicked={characterPicked}
            opponentStillThere={opponentStillThere}
            name={name}
          />
        </Route>
        <Route path="/game">
          <Game
            name={name}
            room={room}
            userCharacter={userCharacter}
            opponentName={opponentName}
            opponentCharacter={opponentCharacter}
            characters={characters}
            message={message}
            messages={messages}
            isGameStarted={isGameStarted}
            isGameOver={isGameOver}
            winner={winner}
            changeRoom={changeRoom}
            replay={replay}
            getUsersInRoom={getUsersInRoom}
            setMessage={setMessage}
            sendMessage={sendMessage}
            setWinner={setWinner}
            setIsGameOver={setIsGameOver}
            sendEndGame={sendEndGame}
            opponentStillThere={opponentStillThere}
            startGame={startGame}
            setIsGameStarted={setIsGameStarted}
            cleanCharacters={cleanCharacters}
            leftRoom={leftRoom}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
