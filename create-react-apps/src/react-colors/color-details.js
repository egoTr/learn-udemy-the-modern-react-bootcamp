import React, { Component } from 'react';
import Error404NotFound from './error-404-not-found';

import NavBar from './nav';

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
            document.title = `React Colors/${this.state.paletteTitleOriginal}/> ${this.state.colorName.toUpperCase()}`;
    } // componentDidUpdate

    goHome = () => {
        this.props.transitionBehavior('right-to-left');

        this.props.history.push(`/`);
    } // end of method

    render() {
        const palettes = this.props.palettes.filter(palette => palette.title.toLowerCase() === this.state.paletteTitle);
        if (!palettes.length)
            return <Error404NotFound/>
        const palette = palettes[0];

        const colors = palette.colors.filter(color => color.name.toLowerCase() === this.state.colorName);
        if (!colors.length)
            return <Error404NotFound/>;
        const color = colors[0];

        if (!this.state.paletteTitleOriginal)
            this.setState({ paletteTitleOriginal: palette.title });

        return (
            <NavBar showFormat={true} goHomeBehavior={this.goHome}/>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default ColorDetails;