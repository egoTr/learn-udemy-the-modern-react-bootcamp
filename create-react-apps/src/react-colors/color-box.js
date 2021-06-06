import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    render() {
        const style = {
            backgroundColor: this.props.color
        };
        return (
            <color-box style={style} title={this.props.name.toUpperCase()}>
                <span title="Copy to clipboard" className="color-copy-button">COPY</span>
                <div className="color-footer">
                    <span className="color-name">{this.props.name}</span>
                    <Link title="View details" to={`/palette/${this.props.paletteTitle.toLowerCase()}/${this.props.name}`} className="color-details">Details</Link>
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