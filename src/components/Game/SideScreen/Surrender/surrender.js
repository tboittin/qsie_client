import React from 'react';

import './surrender.scss';

const Surrender = ({sendEndGame}) => {
    return (
        <div className="surrender" onClick={sendEndGame}>Abandonner la partie</div>
    )
};

export default Surrender;