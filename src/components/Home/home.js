import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <h1>Homescreen</h1>
      <Link
        to={`/rules`}
      >
        <button className="button mt-20">
          Proceed
        </button>
      </Link>
    </div>
  );
};

export default Home;
