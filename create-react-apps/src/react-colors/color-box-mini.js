import React, { Component } from 'react';

class ColorBoxMini extends Component {
    constructor(props) {
        super(props);
    } // constructor

    render() {
        const style = {
            backgroundColor: this.props.color
        };
        return (
            <color-box-mini style={style}></color-box-mini>
         ) // return
    } // render
} // end of class

export default ColorBoxMini;