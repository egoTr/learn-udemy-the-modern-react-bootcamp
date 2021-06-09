import React, { Component } from 'react';
import Error404NotFound from './error-404-not-found';

import NavBar from './nav';

class ColorDetails extends Component {
    constructor(props) {
        super(props);
    } // constructor

    goHome = () => {
        this.props.transitionBehavior('right-to-left');

        this.props.history.push(`/`);
    } // end of method

    render() {
        const result = this.props.color;
        if (!result)
            return <Error404NotFound/>
        
        document.title = `React Colors/${result.palette}/> ${result.color.name.toUpperCase()}`;
        
        return (
            <NavBar goHomeBehavior={this.goHome}/>
         ) // return
    } // render
} // end of class

export default ColorDetails;