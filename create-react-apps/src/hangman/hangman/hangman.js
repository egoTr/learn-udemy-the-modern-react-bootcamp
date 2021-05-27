import React, { Component } from 'react';

import './hangman.css';
import HangmanKey from '../hangman-key/hangman-key';
import ENGLISH_WORDS from '../data/words';

document.title = "React Challenge/> Hangman";

const CONST_MAX_WRONG_GUESSED_ALLOW = 6;
const CONST_PLACEHOLDER_CHAR = "_";

const const_keyboardCode_startA = 97;
const const_keyboardCode_startZ = 122;
let keyboardKeys = [];
for (var i = const_keyboardCode_startA; i <= const_keyboardCode_startZ; i++) {
    keyboardKeys.push( String.fromCharCode(i) );
} // for

function randomWord() {
    return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
} // randomWord
const randomWordInit = randomWord(); console.log(randomWordInit);

function compareKey(key, wordOfMission, wordHolder) {
    var matched = false;
    var wordHolderNew = [...wordHolder];

    for (var i = 0; i < wordOfMission.length; i++) {
        if (wordOfMission[i] === key) {
            matched = true;
            wordHolderNew[i] = key;
        } // if
    } // for

    return { matched, wordHolderNew: wordHolderNew.join('') };
} // compareKey

// pecent of letters has been solved, i.e not underscore (_)
function calCorrectPercent(wordHolder) {
    var count = 0;

    for (var i = 0; i < wordHolder.length; i++)
        if (wordHolder[i] !== CONST_PLACEHOLDER_CHAR)
            count++;
    
    return `${100*count/wordHolder.length}%`;
} // calCorrectPercent

class HangMan extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            title: 'Hangman',
            win: false,
            lose: false,
            wordOfMission: randomWordInit,
            wordHolder: CONST_PLACEHOLDER_CHAR.repeat(randomWordInit.length),
            correctGuessed: 0,
            correctGuessedPecent: 0,
            wrongGuessed: 0
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method
    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    restartGame = () => {
        // this sucks :))))))))
        window.location.reload();

        /* reset stuff
        const randomWordNew = randomWord();

        this.setState({
            title: 'Hangman',
            win: false,
            lose: false,
            wordOfMission: randomWordNew,
            wordHolder: CONST_PLACEHOLDER_CHAR.repeat(randomWordNew.length),
            correctGuessed: 0,
            correctGuessedPecent: 0,
            wrongGuessed: 0
        });

        // re-render
        this.render();
        */
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    pressKey = (key) => {
        if (this.state.win || this.state.lose) // game end
            return;

        const { matched, wordHolderNew } = compareKey(key, this.state.wordOfMission, this.state.wordHolder);
        const correctGuessedNew = this.state.correctGuessed + (matched ? 1 : 0);
        const wrongGuessedNew = this.state.wrongGuessed + (matched ? 0 : 1);
        const correctGuessedPecentNew = calCorrectPercent(wordHolderNew);
        const winNew = (correctGuessedPecentNew === '100%'); // this funny
        const loseNew = (wrongGuessedNew === CONST_MAX_WRONG_GUESSED_ALLOW);
        
        let titleNew = "Hangman";
        if (winNew)
            titleNew = "Man saved !!!";
        if (loseNew)
            titleNew = "Man hanged :((";

        this.setState( currentState => (
            {
                title: titleNew,
                win: winNew,
                lose: loseNew,
                wordHolder: wordHolderNew,
                correctGuessed: correctGuessedNew, 
                correctGuessedPecent: correctGuessedPecentNew, 
                wrongGuessed: wrongGuessedNew
            }
        )) // setState
    } // pressKey

    render() {
         return (
            <hangman is="react" win={`${this.state.win}`} lose={`${this.state.lose}`}>
                <h1 win={`${this.state.win}`} lose={`${this.state.lose}`}>{this.state.title}</h1>

                <panelMain is="react">
                    <panelLeft is="react">
                        <img alt="hangman step" src={`/img/hangman-steps/${this.state.wrongGuessed}.jpg`}/>
                        
                        <hangman-misison>{this.state.wordHolder}</hangman-misison>
                        {(this.state.lose && this.state.correctGuessedPecent >= '33%') && <hangman-misison>{this.state.wordOfMission}</hangman-misison>}

                        <hangman-teller-wrong>
                            { this.state.wrongGuessed === 0 && "Wrong guessed"}

                            <hangman-teller-wrong-inner
                                style={{ width: `${100*this.state.wrongGuessed/CONST_MAX_WRONG_GUESSED_ALLOW}%` }}>
                            </hangman-teller-wrong-inner>
                        </hangman-teller-wrong>

                        <hangman-teller-correct>
                            { this.state.correctGuessed === 0 && "Correct guessed"}

                            <hangman-teller-correct-inner
                                style={{ width: this.state.correctGuessedPecent }}>
                            </hangman-teller-correct-inner>
                        </hangman-teller-correct>
                    </panelLeft>   

                    <panelRight is="react">
                        <hangman-keyboard is="react">
                            { keyboardKeys.map( (item, i) => 
                                <HangmanKey
                                    key={i}
                                    value={item}
                                    endGame={this.state.win || this.state.lose}
                                    clickBehavior={this.pressKey}
                                />
                            )} 
                        </hangman-keyboard>
                        <button onClick={this.restartGame}>Restart</button>
                    </panelRight>
                </panelMain>
            </hangman>
         ) // return
    } // render
} // end of class

export default HangMan;