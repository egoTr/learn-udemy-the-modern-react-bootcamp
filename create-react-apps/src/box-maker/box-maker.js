import React, { Component } from 'react';
import BoxForm from './box-form';
import ColorBox from './color-box';
import './box-maker.css';

import * as Helpers from '../helpers';

document.title = "React Challenge/> Box Maker";

class BoxMaker extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            boxes: [
                { id: Date.now(), width: 70, height: 70, color: Helpers.randomColor() }
            ]
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    // an EXPERIMENTAL approach to bind 'this'
    addColorBox = (box) => {
        const newBox = {...box, id: Date.now()};

        this.setState( currentState => (
            { boxes: [...currentState.boxes, newBox] } // push(), pop()... not work for array states
        )) // setState
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    removeColorBoxById = (id) => {
        this.setState( currentState => (
            { boxes: currentState.boxes.filter( box => box.id !== id ) } // push(), pop()... not work for array states
        )) // setState
    } // removeColorBox
    
    render() {
         return (
            <box-maker is="react">
                <h1>Box Maker</h1>
                <BoxForm submitBehavior={this.addColorBox}/>

                <hr/>
                <h2>Box list</h2>
                <box-container is="react">
                    { this.state.boxes.map( (box, i) =>
                        <ColorBox
                            key={box.id}
                            id={box.id}
                            width={box.width}
                            height={box.height}
                            color={box.color}
                            clickBehavior={this.removeColorBoxById}
                        />
                    )}
                </box-container>    
            </box-maker>
         ) // return
    } // render
} // end of class

export default BoxMaker;