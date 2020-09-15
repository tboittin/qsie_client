import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Join from "./components/Join/join";
import Game from "./components/Game/game";
import Home from "./components/Home/home";
import Rules from "./components/Rules/rules";
import ChooseCharacter from "./components/ChooseCharacter/chooseCharacter";
import Rooms from "./components/Rooms/rooms";

const App = () => {
  // const ENDPOINT = 'http://localhost:5000/';
  const ENDPOINT = "https://qsie-server.herokuapp.com/";

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/rooms">
          <Rooms />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
        <Route path="/chooseCharacter">
          <ChooseCharacter />
        </Route>
        <Route path="/game">
          <Game endpoint={ENDPOINT}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
