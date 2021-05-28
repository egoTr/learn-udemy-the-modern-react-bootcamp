import React, { Component } from 'react';
import ENGLISH_WORDS from '../data/words';

import './hangman.css';
import './hangman-key.css';

document.title = "React Challenge/> Hangman";

const CONST_MAX_WRONG_GUESSED_ALLOW = 6;
const CONST_PLACEHOLDER_CHAR = "_";

function randomWord() {
    return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
} // randomWord
const randomWordInit = randomWord();
console.log('init() => randomWord = ', randomWordInit);

class HangMan extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            started: false, // just for controlling the tellers in words: wrong guessed, correct guessed
            mission: randomWordInit,
            lettersGuessed: new Set(),
            wrongGuessed: 0
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method
    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    restartGame = () => {
        const randomWordNew = randomWord();
        console.log('reset() => randomWord = ', randomWordNew);

        this.setState({            
            mission: randomWordNew,
            lettersGuessed: new Set(),
            wrongGuessed: 0
        });
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    pressKey = (event) => {
        const key = event.target.innerText;

        this.setState( currentState => (
            {
                started: true,
                lettersGuessed: currentState.lettersGuessed.add(key),
                wrongGuessed: currentState.wrongGuessed + (this.state.mission.includes(key) ? 0 : 1)
            }
        )) // setState
    } // pressKey

    render() {
        const missionHolder = [...this.state.mission].map( letter =>
            this.state.lettersGuessed.has(letter) ? letter : CONST_PLACEHOLDER_CHAR
        );
        const correctGuessed = [...this.state.mission].reduce( (total, letter) => (
            total += this.state.lettersGuessed.has(letter) ? 1 : 0
        ), 0);
        const correctGuessedPecent = `${100*correctGuessed/this.state.mission.length}%`;
        const wrongGuessedPecent = `${100*this.state.wrongGuessed/CONST_MAX_WRONG_GUESSED_ALLOW}%`;
        const isWin = (correctGuessedPecent === '100%'); // this funny
        const isLose = (this.state.wrongGuessed === CONST_MAX_WRONG_GUESSED_ALLOW);
        const isEndGame = isWin || isLose;

        let title = "Hangman";
        if (isWin)
            title = "Man saved !!!";
        if (isLose)
            title = "Man hanged :((";

         return (
            <hangman is="react"win={`${isWin}`}>
                <h1 win={`${isWin}`} lose={`${isLose}`}>{title}</h1>

                <panelMain is="react">
                    <panelLeft is="react">
                        <img alt="hangman step" step={this.state.wrongGuessed} src={`/img/hangman-steps/${this.state.wrongGuessed}.jpg`}/>
                        
                        <hangman-misison>{missionHolder}</hangman-misison>
                        {(isLose && correctGuessedPecent >= '33%') && <hangman-misison>{this.state.mission}</hangman-misison>}

                        <hangman-teller-wrong>
                            { (this.state.started === false && this.state.wrongGuessed === 0) && "Wrong guessed"}

                            <hangman-teller-wrong-inner
                                style={{ width: wrongGuessedPecent }}>
                            </hangman-teller-wrong-inner>
                        </hangman-teller-wrong>

                        <hangman-teller-correct>
                            { (this.state.started === false && correctGuessed === 0) && "Correct guessed"}

                            <hangman-teller-correct-inner
                                style={{ width: correctGuessedPecent }}>
                            </hangman-teller-correct-inner>
                        </hangman-teller-correct>
                    </panelLeft>   

                    <panelRight is="react">
                        <hangman-keyboard>
                            { [..."abcdefghijklmnopqrstuvwxyz"].map( (item, i) => 
                                <button className="hangman-key"
                                    key={i}
                                    endgame={`${isEndGame}`}
                                    disabled={this.state.lettersGuessed.has(item)}
                                    onClick={this.pressKey}
                                >
                                {item}
                                </button>
                            )} 
                        </hangman-keyboard>
                        <button className="hangman-button" onClick={this.restartGame}>Restart</button>
                    </panelRight>
                </panelMain>
            </hangman>
         ) // return
    } // render
} // end of class

export default HangMan;

// git commit -m "2021 May, 28#2 - challenge(hangman).resolve()"