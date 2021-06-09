import React, { Component } from 'react';

class Transition extends Component {
    constructor(props) {
        super(props);
    } // constructor

    render() {
        return (
            <div className="transition-outer" direction={`${this.props.direction}`}>
                <div className="transition-inner" direction={`${this.props.direction}`}></div>
            </div>
         ) // return
    } // render
} // end of class

export default Transition;