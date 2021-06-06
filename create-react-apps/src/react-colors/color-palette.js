import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ColorBox from './color-box';

class ColorPalette extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            paletteTitle: this.props.match.params.paletteTitle,
            paletteTitleOriginal: null
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
        if (this.state.paletteTitleOriginal)
            document.title = `React Colors/> ${this.state.paletteTitleOriginal}`;
    } // componentDidUpdate

    render() {
        const palette = this.props.palettes.filter(palette => palette.title.toLowerCase() === this.state.paletteTitle)[0];
        if (!this.state.paletteTitleOriginal)
            this.setState({ paletteTitleOriginal: palette.title });

        return (
            <color-palette is="react">
                <div className="color-palette-header">
                    <Link to="/"><h3>Home</h3></Link>
                    <span className="color-level">Level</span>
                    <span className="color-format">Color format</span>
                </div>

                <div className="color-palette-container">
                    { palette.colors.map( (item, i) =>
                        <ColorBox
                            key={i}
                            color={item.hex}
                            paletteTitle={palette.title}
                            name={item.name}
                        />
                    )}
                </div>

                <div className="color-palette-footer">

                </div>
            </color-palette>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default ColorPalette;