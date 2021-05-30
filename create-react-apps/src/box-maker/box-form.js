import React, { Component } from 'react';
import * as Helpers from '../helpers';

class BoxForm extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            width: 70,
            height: 70,
            color: Helpers.randomColor()
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    addColorBox = (event) => {
        event.preventDefault();

        this.props.submitBehavior(this.state);

        // reset stuff
        this.setState({
            color: Helpers.randomColor()
        }) // setState

        // set focus on box's color
        const inputColor = document.querySelector('form').elements['color'];
        inputColor.focus();
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    inputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    } // end of method

    render() {
         return (
            <form className="box-form" onSubmit={this.addColorBox}>
                <p>Width (pixel)</p>
                <input name="width" type="number" onChange={this.inputChange} value={this.state.width}/>

                <p>Height (pixel)</p>
                <input name="height" type="number" onChange={this.inputChange} value={this.state.height}/>

                <p>Color (#f00 or red)</p>
                <input name="color" type="text" autoFocus onChange={this.inputChange} value={this.state.color}/>

                <button>Add box</button>
            </form>
         ) // return
    } // render
} // end of class

export default BoxForm;