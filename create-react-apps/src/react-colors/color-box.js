import React, { Component } from 'react';

import './css/color-box.css';

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

    async componentDidMount() {
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

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

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default ColorBox;