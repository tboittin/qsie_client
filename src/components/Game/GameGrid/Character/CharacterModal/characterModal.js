import React from "react";
import "./characterModal.scss";

const CharacterModal = ({
  character,
  toggle,
  setWinner,
  setIsGameOver,
  displayButtons,
}) => {
  const elimination = () => {
    toggle();
    character.display = "innocent";
  };

  const choixFinal = () => {
    toggle();
    if (character.opponentCharacter === true) {
      setWinner(true);
      setIsGameOver(true);
    } else {
      character.display = "wrong";
      return alert("Ce n'était pas le bon personnage");
    }
  };

  return (
    <>
      <div className="characterModalOuter">
        <p className="underline hover" onClick={toggle}>
          Revenir au jeu
        </p>
        <div className="characterModalInner">
          <div className="face">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <h2>{character.pronoun}</h2>
          </div>
          <div className="modal-menu">
            {!character.description && (
              <p className="character-description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            )}
            {character.description && <p>{character.description}</p>}
            {displayButtons && (
              <>
                <button className="button" onClick={choixFinal}>
                  Je suis sur.e, c'est iel!
                </button>
                <button className="button grey" onClick={elimination}>
                  Ce n'est pas iel.
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterModal;
