import React from "react";
import { Link } from "react-router-dom";

import "./home.scss";

const Home = () => {
  return (
    <>
      <h1>Homescreen</h1>
      <Link
        to={`/join`}
      >
        <button className="button mt-20">
          Proceed
        </button>
      </Link>
    </>
  );
};

export default Home;
