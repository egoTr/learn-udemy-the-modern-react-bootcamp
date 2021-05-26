import React, { Component } from 'react';
import './hangman-key.css';

class HangmanKey extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    methodName = () => {
    } // end of method

    render() {
         return (
            <hangman-key>{this.props.value}</hangman-key>
         ) // return
    } // render
} // end of class

export default HangmanKey;