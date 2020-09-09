import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/join';
import Game from './components/Game/game';

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/game" component={Game} />
    </Router>
)

export default App;