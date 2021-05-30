import React, { Component } from 'react';

class ColorBox extends Component {
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
    removeMe = () => {
        this.props.clickBehavior(this.props.id);
    } // end of method

    render() {
        const style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            backgroundColor: this.props.color
        };

         return (
            <color-box
                is="react"
                title="Click to remove"
                onClick={this.removeMe}
                style={style}>
            </color-box>
         ) // return
    } // render
} // end of class

export default ColorBox;