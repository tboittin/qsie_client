import React from "react";
import { Link } from "react-router-dom";
import Circles from "../Circles/circles";

import "./rules.scss";

const Rules = () => {
  return (
    <div className="rules">
      <h1>Principes</h1>
      <p>
        Fille ou garçon? C'est la première question que l'on pose lorsqu'on
        apprend que l'on va être parent; la première réponse à cocher dans la
        plupart des questionnaires; le premier choix à faire quand on veut se
        rendre dans des toilettes publiques.
      </p>
      <p>
        Cette conception binaire du genre commence aujourd'hui à évoluer vers un
        modèle plus inclusif, mais le changement perne encore à s'imposer comme
        une évidence.
      </p>
      <Link to={`/join`}>
        <button className="button">J'ai compris les règles</button>
      </Link>
      <Circles numberOfCircles={4} highlitedOne={0} />
    </div>
  );
};

export default Rules;
