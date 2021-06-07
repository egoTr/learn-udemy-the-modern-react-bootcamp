import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import ColorHelper from '../helpers';

import NavBar from './nav';
import ColorBox from './color-box';
import NotifyCopy from './notify-copy';
import Error404NotFound from './error-404-not-found';

class ColorPalette extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            paletteTitle: this.props.match.params.paletteTitle,
            paletteTitleOriginal: null,
            format: 'HEX',
            copiedColor: null,
            notifyCopy: false
        } // state

        this.stopTransition = () => {
            setTimeout( () => {
                this.setState({ notifyCopy: false })
            }, 2000);
        }
        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
        if (this.state.paletteTitleOriginal)
            document.title = `React Colors/> ${this.state.paletteTitleOriginal}`;
    } // componentDidUpdate
    
    goHome = () => {
        this.props.transitionBehavior('right-to-left');

        this.props.history.push(`/`);
    } // end of method

    copyColor = (color) => {
        if (this.state.notifyCopy)
            return;

        let colorResult = color;
        if (this.state.format === 'rgb')
            colorResult = ColorHelper.rgbToString( ColorHelper.hexToRgb(color) );

        copy(colorResult);

        this.setState({ copiedColor: colorResult, notifyCopy: true }, () => {
            this.stopTransition();
        });
    } // copyColor

        // an EXPERIMENTAL approach to bind 'this'
    viewColor = (colorName) => {
        this.props.transitionBehavior('left-to-right');

        this.props.history.push(`/palette/${this.state.paletteTitle.toLowerCase()}/${colorName}`);
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    changeFormat = () => {
        const newFormat = this.state.format === 'HEX' ? 'rgb' : 'HEX';

        this.setState({ format: newFormat });
    } // end of method

    render() {
        const palettes = this.props.palettes.filter(palette => palette.title.toLowerCase() === this.state.paletteTitle);
        if (!palettes.length)
            return <Error404NotFound/>

        const palette = palettes[0];

        if (!this.state.paletteTitleOriginal)
            this.setState({ paletteTitleOriginal: palette.title, copiedColor: palette.colors[0].hex });

        return (
            <color-palette is="react">
                <NotifyCopy color={this.state.copiedColor} toShowed={this.state.notifyCopy}/>

                <NavBar
                    goHomeBehavior={this.goHome}
                    showLevel={true}
                    showFormat={true}
                    format={this.state.format}
                    color={this.state.copiedColor}
                    changeFormatBehavior={this.changeFormat}
                />
                
                <div className="color-palette-container">
                    { palette.colors.map( (item, i) =>
                        <ColorBox
                            key={i}
                            color={item.hex}
                            paletteTitle={palette.title}
                            name={item.name}
                            copyColorBehavior={this.copyColor}
                            viewColorBehavior={this.viewColor}
                        />
                    )}
                </div>

                <div className="color-palette-footer">

                </div>
            </color-palette>
         ) // return
    } // render

    componentWillUnmount() {
        clearTimeout(this.stopTransition);
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default ColorPalette;