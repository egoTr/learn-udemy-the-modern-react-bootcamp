import React, { Component } from 'react';
import './app.css';
import Dice from './components/dice/dice';

function rollTheDice() {
  const dice1 = Math.floor(Math.random() * 6) + 1; // random number from 1 to 6
  const dice2 = Math.floor(Math.random() * 6) + 1;

  return { dice1, dice2 };
} // rollTheDice

function rollTheDiceThenSetState() {
  if (this.state.isRolling)
    return;

  this.setState({ dice1: 'rolling', dice2: 'rolling' }); // spinning

  this.setState({ started: true, isRolling: true });

  setTimeout(() => {
    this.setState({ ...rollTheDice(), isRolling: false });  
  }, 3000);
} // rollTheDiceThenSetState

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      started: false,
      dice1: 0, // as question-mark
      dice2: 0, // as question-mark
      isRolling: false
    }

    this.rollTheDice = rollTheDiceThenSetState.bind(this);
  } // constructor

  render() {
    return (
      <app is="react">
        <dice-tray started={this.state.started}>
            <Dice isRolling={this.state.isRolling} diceNumber={this.state.dice1}/>
            <Dice isRolling={this.state.isRolling} diceNumber={this.state.dice2}/>
        </dice-tray>
        <button
            onClick={this.rollTheDice}
            disabled={this.state.isRolling}
            >
            { this.state.isRolling ? "Rolling..." : "Roll" }
        </button>
      </app>
    ); // return
  } // render
} // class App

export default App;
