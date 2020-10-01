import React, { useState, useEffect } from "react";

import { shuffle } from "../../../helpers/helpers";

import "./gameGrid.scss";
import Character from "./Character/character";

const GameGrid = ({ opponentCharacter, characters, setWinner, setIsGameOver }) => {
  const [charactersDeck, setCharactersDeck] = useState([]);

  useEffect(() => {
    const characterDeck = (opponentCharacter, characters, size) => {
      let finalDeck = [];
      // je mélange l'array & je le limite à la taille voulue
      const rightSizeDeck = shuffle(characters).slice(0, size);
      // je vérifie que le personnage y est
      if (rightSizeDeck.find((e) => e.name === opponentCharacter.name)) {
        // S'il y est je le remplace avec l'élément
        let i = rightSizeDeck.find((e) => e.name === opponentCharacter.name);
        rightSizeDeck[i] = opponentCharacter;
        finalDeck = rightSizeDeck;
      } else {
        // S'il n'y est pas, je le mets à la place d'un personnage au hasard du jeu
        let i = Math.floor(Math.random() * rightSizeDeck.length);
        rightSizeDeck[i] = opponentCharacter;
        finalDeck = rightSizeDeck;
      }
      setCharactersDeck(finalDeck);
    };

    characterDeck(opponentCharacter, characters, 20);
  }, [opponentCharacter]);
  // Comprendre pourquoi j'ai des warning de missing depencies

  return (
    <div className="grid">
      {charactersDeck.map((character) => (
        <Character
          character={character}
          key={character.name}
          setWinner={setWinner}
          setIsGameOver={setIsGameOver}
        />
      ))}
    </div>
  );
};

export default GameGrid;
