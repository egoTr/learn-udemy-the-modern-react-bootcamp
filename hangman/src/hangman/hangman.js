import React, { Component } from 'react';
import './hangman.css';
import HangmanKeyboard from '../hangman-keyboard/hangman-keyboard';

class HangMan extends Component {
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
            <hangman is="react">
                <img alt="hangman step" src="/img/hangman-steps/0.jpg"/>
                <p>Teller</p>
                <p>word of mission</p>
                <HangmanKeyboard />
                <button>Restart</button>
            </hangman>
         ) // return
    } // render
} // end of class

export default HangMan;