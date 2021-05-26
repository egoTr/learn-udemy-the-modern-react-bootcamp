import React, { Component } from 'react';
import './app.css';
import HangMan from './hangman/hangman';

class App extends Component {
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
      <app is="react">
        <HangMan />
      </app>
     ) // return
  } // render
} // end of class

export default App;