import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <p className="description">
        Jeu de déduction, crée en collaboration avec 
        <span className="refuge"> Le Refuge Genève</span>, Qui Sont-Iels? tente
        de faire évoluer la discussion sur les stéréotypes de genre et
        d’orientation.
      </p>
      <img className="topLeft" src="./home/QSI_HS_1.png" alt="" />
      <img className="bottomRight" src="./home/QSI_HS_2.png" alt="" />
      <img
        className="logo"
        src="./home/QSI_HS_Logo.png"
        alt="Logo Qui Sont-Iels"
      />
      {/* <Link to={`/rules`}>
        <button className="button homeLink">Jouer</button>
      </Link> */}
      <p className="homeLink">Le jeu sera disponible très bientôt.</p>
    </div>
  );
};

export default Home;
