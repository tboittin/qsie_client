import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/join';
import Game from './components/Game/game';
import Home from './components/Home/home';
import Rules from './components/Rules/rules';

const App = () => (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/join" exact component={Join} />
        <Route path="/rules" component={Rules} />
        <Route path="/game" component={Game} />
    </Router>
)

export default App;