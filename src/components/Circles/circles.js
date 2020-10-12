import React from 'react';

import './circles.scss';

const Circles = ({numberOfCircles, highlitedOne}) => {
    const circles = [];
    const makeCircles = () => {
        for (let i = 0 ; i < numberOfCircles ; i++ ) {
            let circle = {
                id : i
            };
            circles.push(circle);
        }
    }
    makeCircles()
    return (
        <div className="circles">
        {
            circles.map(c=> 
                <div
                    key={c.id}
                    className={
                        `circle ${(c.id === highlitedOne) ?
                            'highlited'
                            : ''
                        }`
                    }
                />
            )
        }
        </div>
    )
}

export default Circles;