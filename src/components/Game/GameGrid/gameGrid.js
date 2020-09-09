import React from "react";

import "./gameGrid.scss";
import Character from "./Character/character";

const GameGrid = (userCharacter) => {
  const characters = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "10" },
    { name: "11" },
    { name: "12" },
    { name: "13" },
    { name: "14" },
    { name: "15" },
    { name: "16" },
    { name: "17" },
    { name: "18" },
    { name: "19" },
    { name: "20" },
    { name: "21" },
    { name: "22" },
    { name: "23" },
    { name: "24" },
    { name: "25" }
  ];

  const shuffle = (array) => {
    let m = array.length;
    let t;
    let i;

    while (m) {
      i = Math.floor(Math.random()*m--);
      t=array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };

  const characterDeck = (userCharacter, characters, size) => {
    let finalDeck = [];
    // je mélange l'array & je le limite à la taille voulue
    const rightSizeDeck = shuffle(characters).slice(0,size);
    // je vérifie que le personnage y est
    if (rightSizeDeck.find(e => e.name === userCharacter.name)) {
      // S'il y est je ne fais rien
      finalDeck = rightSizeDeck;
    } else {
      // S'il n'y est pas, je le remplace avec un personnage au hasard du jeu
      let i = Math.floor(Math.random()*rightSizeDeck.length);
      rightSizeDeck[i] = userCharacter;
      finalDeck = rightSizeDeck;
    };
    return finalDeck;
  };

  return (
    <div className="grid">
      {characterDeck(userCharacter, characters, 20).map(character => (
        <Character character={character} key={character.name}/>
      ))}
    </div>
  );
};

export default GameGrid;
