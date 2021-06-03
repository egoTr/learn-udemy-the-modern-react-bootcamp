import React, { Component } from 'react';
import ToDo from './todo/todo';
import DadJokes from './dad-jokes/dad-jokes';

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
      <DadJokes />
     ) // return
  } // render
} // end of class

export default App;