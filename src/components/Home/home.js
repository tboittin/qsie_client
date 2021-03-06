import React from "react";

import "./home.scss";

const Home = ({setScreen}) => {
  return (
    <div className="home">
      <div className="description">
        <p>
          Jeu de déduction, créé en collaboration avec{" "}
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
      <button
        className="button homeLink large-devices"
        onClick={()=>setScreen('rules')}
      >
        Jouer
      </button>
      <img
        className="spielact hover"
        src="./QSI_smalldevicespielact.png"
        alt="logo du spielact festival"
        href='https://www.spielact.ch/'
      />
      {/* <p className="homeLink large-devices">Le jeu sera disponible très bientôt.</p> */}
      <p className="homeLink small-devices">Le jeu n'est disponible que sur tablette (mode paysage) et ordinateur.</p>
    </div>
  );
};

export default Home;
