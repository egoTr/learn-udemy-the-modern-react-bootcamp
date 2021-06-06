import React, { Component } from 'react';

class ColorDetails extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            paletteTitle: this.props.match.params.paletteTitle,
            paletteTitleOriginal: null,
            colorName: this.props.match.params.colorName
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
        if (this.state.paletteTitleOriginal)
            document.title = `React Colors\\${this.state.paletteTitleOriginal}/> ${this.state.colorName.toUpperCase()}`;
    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    methodName = () => {
    } // end of method

    render() {
        const palette = this.props.palettes.filter(palette => palette.title.toLowerCase() === this.state.paletteTitle)[0];
        const color = palette.colors.filter(color => color.name.toLowerCase() === this.state.colorName)[0];

        if (!this.state.paletteTitleOriginal)
            this.setState({ paletteTitleOriginal: palette.title });

        return (
            <h1>{`${palette.title}\\${color.name}`}</h1>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default ColorDetails;