import React, { Component } from 'react';
import './hangman-keyboard.css';
import HangmanKey from '../hangman-key/hangman-key';

const const_keyboardCode_startA = 97;
const const_keyboardCode_startZ = 122;
let keyboardKeys = [];
for (var i = const_keyboardCode_startA; i <= const_keyboardCode_startZ; i++) {
    keyboardKeys.push( String.fromCharCode(i) );
} // for

class HangmanKeyboard extends Component {
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
            <hangman-keyboard is="react">
                { keyboardKeys.map( (item, i) => <HangmanKey key={i} value={item} />) }
            </hangman-keyboard>
         ) // return
    } // render
} // end of class

export default HangmanKeyboard;