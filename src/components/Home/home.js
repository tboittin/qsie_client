import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="description">
        <p>
          Jeu de déduction, crée en collaboration avec{" "}
          <a  href='https://refuge-geneve.ch/'><span className="refuge">Le Refuge Genève</span></a>, Qui Sont-Iels?
          tente de faire évoluer la discussion sur les stéréotypes de genre et
          d’orientation.
        </p>
        <p>
          Ce jeu est créé pour et produit par le festival{" "}
          <a href='https://www.spielact.ch/'><span className="refuge">Spielact</span></a>.
        </p>
      </div>
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
      <img
        className="spielact hover"
        src="./spielact-logo.webp"
        alt="logo du spielact festival"
        href='https://www.spielact.ch/'
      />
      <p className="homeLink">Le jeu sera disponible très bientôt.</p>
    </div>
  );
};

export default Home;
