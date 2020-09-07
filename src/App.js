import React from 'react';

import { browserRouter as Router, Route } from 'react-router-dom';

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
)