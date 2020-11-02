import React, { useEffect, useState } from "react";
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
  // const ENDPOINT = "http://localhost:5000/";
  const characters = [...CHARACTERS.default];

  const [screen, setScreen] = useState('home');

  const [name, setName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [userCharacter, setUserCharacter] = useState({});
  const [opponentCharacter, setOpponentCharacter] = useState({});

  const [roomLength, setRoomLength] = useState('');

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [nameError, setNameError] = useState(false);

  const [opponentStillThere, setOpponentStillThere] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const [leftTheGame, setLeftTheGame] = useState(false);

  const [visitor, setVisitor] = useState(false);
  const [creator, setCreator] = useState(false);

  const consoleEverything = () => {
    console.log('name:',name);
    console.log('room:',room);
    console.log('opponentName:',opponentName);
    console.log('userCharacter:', userCharacter);
    console.log('opponentCharacter:', opponentCharacter);
    console.log('isGameStarted:', isGameStarted);
    console.log('isGameOver:', isGameOver);
    console.log('winner:',winner);
    console.log('message:', message);
    console.log('messages:', messages);
    console.log('nameError:', nameError);
    console.log('opponentStillThere:',opponentStillThere);
    console.log('rediirected', redirected);
    console.log('leftTheGame:', leftTheGame);
    console.log('visitor:',visitor);
    console.log('creator', creator);
  }

  // Nettoyage de toutes les données
  const reinitializeUser = () => {
    console.log('reinitialization');
    socket.emit('reinitialize', (name));
    setName('');
    setOpponentName('');
    setRoom('');
    setRooms([]);
    setUserCharacter('');
    setOpponentCharacter('');
    setIsGameStarted(false);
    setIsGameOver(false);
    setWinner(false);
    setMessage('');
    setMessages([]);
    setNameError(false);
    setOpponentStillThere(true);
    setRedirected(false);
    setLeftTheGame(false);
    setVisitor(false);
    setCreator(false);
    cleanCharacters();
  }

  // Nettoyage des données à l'écran rooms
  const reinitializeUserRoom = () => {
    cleanMessages();
    setOpponentName('');
    setRoom("");
    setWinner(false);
    setIsGameOver(false);
    setIsGameStarted(false);
  }

  
  // Nettoyage des données à l'écran chooseCharacter
  const reinitializeUserChooseCharacter = () => {
    console.log('reinitializeUserCharacter');
    cleanMessages();
    setWinner(false);
    setIsGameOver(false);
    setIsGameStarted(false);
  }

  // Nettoyage des personnages attribués aux joueurs + nettoyage de l'affichage des personnages entre les parties
  const cleanCharacters = () => {
    setUserCharacter({});
    setOpponentCharacter({});
    for (let i = 0; i < characters.length; i++) {
      characters[i].display = "unknown";
      characters[i].opponentCharacter = "false";
    }
  };

  const cleanMessages = () => {
    setMessages([]);
  };

  // Dans Join

  const checkIfUserExists = (name) => {
    socket.emit('existingUser', name, (callbackValue) => {
      if (callbackValue === true) {
        setNameError(true);
      };
      if (callbackValue === false) {
        setNameError(false);
      };
      if (callbackValue !== true && callbackValue !== false) {
        console.log('existingUser callbackValue error');
      };
    });
  };

  // // updateName: ajouter le joueur dans le back & vérifier que son nom n'est pas déjà pris + déconnecter quand l'user quitte la page
  const updateName = (name) => {
    console.log('updateName',name);
    setName(name);
    console.log('login', name)
    socket.emit("login", name );

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

  const getRoomLength = (room) => {
    socket.emit('getRoomLength', room);
  }

  // // ajouter la room créée dans le state
  const updateRoom = (room) => {
    setRoom(room);
  };

  // // rejoint la room
  const joinRoom = () => {
    socket.emit("joinRoom", { name, room }, (error) => {
      if(screen === 'rooms') {
        alert(error);
      }
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
    socket.emit(
      "startGame",
      {
        name,
        clientCharacter: userCharacter,
        room,
      },
      (error) => {
        consoleEverything();
        setScreen('home');
        alert(error);
      }
    );
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
    reinitializeUserChooseCharacter();
    socket.emit("replay");
  };

  // // retourne à l'écran de choix des rooms et supprime la value de room
  const changeRoom = () => {
    reinitializeUserRoom();
    socket.emit("changeRoom",
    room,
    name //DEV
    );
  };
  
  const redirectedToRooms = () => {
    console.log('redirectedToRooms, room:', room);
    socket.emit("redirectedToRooms", room);
    reinitializeUserRoom();
    setRedirected(true);// Sert à afficher une popup lorsqu'on est éjecté de la partie
  };

  // Affiche une popup lorsqu'on quitte la partie
  // // sert principalement à corriger la liste des rooms: l'adversaire est toujours dans la room à l'affichage de la popup
  // // la liste des rooms est rafraichie en fermant la popup et on se retrouve avec une liste correcte
  const leftRoom = () => {
    setLeftTheGame(true);
  };

  //Redirected to Home (error)
  const redirectedToHome = () => {
    setScreen('home');
    reinitializeUser();
  }

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.on('existingUser', existingUserValue => setNameError(existingUserValue))
  })

  useEffect(() => {
    getUsersInRoom();
  }, []);

  useEffect(() => {
    socket.on("users", (users) => {
      console.log(users);
    });
  }, []);

  useEffect(() => {
    socket.on("endGame", () => {
      setIsGameOver(true);
    });
  }, []);

  useEffect(() => {
    socket.on("rooms", (rooms) => {
      setRooms(rooms);
    });
  }, [setRooms, rooms]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  },[message]);


  useEffect(() => {

    socket.on("startGame", ({ opponentName, opponentCharacter }) => {
      setOpponentName(opponentName);
      setOpponentCharacter(opponentCharacter);
      setIsGameStarted(true);
    });

  }, []);

  useEffect(() => {
    socket.on("redirectToRooms", () => {
      setOpponentStillThere(false);
    });
  });

  useEffect(() => {
    socket.on('reinitializeMe', () => {
      reinitializeUser();
    });
  });

  useEffect(() => {
    socket.on('roomLength', (length) => {
      setRoomLength(length);
      console.log('roomLength', roomLength);
    })
  }, [roomLength]);

  return (
    <>
      {(screen === 'home') &&
        <Home
          setScreen={setScreen}
        />
      }
      {(screen === 'rules') &&
        <Rules
          setScreen={setScreen}
        />
      }
      {(screen === 'join') &&
        <Join
          checkIfUserExists={checkIfUserExists}
          updateName={updateName}
          nameError={nameError}
          setScreen={setScreen}
        />
      }
      {(screen === 'rooms') &&
        <Rooms
          name={name}
          room={room}
          rooms={rooms}
          opponentStillThere={opponentStillThere}
          redirected={redirected}
          leftTheGame={leftTheGame}
          roomLength={roomLength}
          visitor={visitor}
          creator={creator}
          getRooms={getRooms}
          updateRoom={updateRoom}
          setRedirected={setRedirected}
          setIsGameOver={setIsGameOver}
          redirectedToRooms={redirectedToRooms}
          setOpponentStillThere={setOpponentStillThere}
          setLeftTheGame={setLeftTheGame}
          setVisitor={setVisitor}
          setCreator={setCreator}
          setScreen={setScreen}
          redirectedToHome={redirectedToHome}
          getRoomLength={getRoomLength}
          setRoomLength={setRoomLength}
        />
      }
      {(screen === 'chooseCharacter') &&
        <ChooseCharacter
          userCharacter={userCharacter}
          pickCharacter={pickCharacter}
          characterPicked={characterPicked}
          opponentStillThere={opponentStillThere}
          name={name}
          joinRoom={joinRoom}
          visitor={visitor}
          creator={creator}
          setScreen={setScreen}
          redirectedToHome={redirectedToHome}
        />
      }
      {(screen === 'game') &&
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
          setMessage={setMessage}
          sendMessage={sendMessage}
          setWinner={setWinner}
          setIsGameOver={setIsGameOver}
          sendEndGame={sendEndGame}
          opponentStillThere={opponentStillThere}
          startGame={startGame}
          cleanCharacters={cleanCharacters}
          leftRoom={leftRoom}
          setScreen={setScreen}
          redirectedToHome={redirectedToHome}
        />
      }
    </>
  );
};

export default App;
