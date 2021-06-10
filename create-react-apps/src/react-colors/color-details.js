import React from 'react';
import Error404NotFound from './error-404-not-found';

import NavBar from './nav';

function ColorDetails(props) {
    function goHome() {
        props.transitionBehavior('right-to-left');

        props.history.push(`/`);
    } // end of method

    const result = props.color;
    if (!result)
        return <Error404NotFound/>
    
    document.title = `React Colors/${result.palette}/> ${result.color.name.toUpperCase()}`;
    
    return (
        <NavBar goHomeBehavior={goHome}/>
        ) // return
} // end of class

export default ColorDetails;