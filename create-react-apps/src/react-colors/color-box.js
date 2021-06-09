import React, { Component } from 'react';

import './css/color-box.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
    } // constructor

    copyColor = () => {
        this.props.copyColorBehavior( this.props.color.toUpperCase() );
    } // copyColor

    // an EXPERIMENTAL approach to bind 'this'
    viewColor = (event) => {
        event.stopPropagation();

        this.props.viewColorBehavior(this.props.name);
    } // end of method

    render() {
        const style = {
            backgroundColor: this.props.color
        };
        return (
            <color-box style={style} title={this.props.name.toUpperCase()} onClick={this.copyColor}>
                <span title="Copy to clipboard" className="color-copy-button">COPY</span>
                <div className="color-footer">
                    <span className="color-name">{this.props.name}</span>
                    <span title="View details" className="color-details" onClick={this.viewColor}>Details</span>
                </div>
            </color-box>
         ) // return
    } // render
} // end of class

export default ColorBox;