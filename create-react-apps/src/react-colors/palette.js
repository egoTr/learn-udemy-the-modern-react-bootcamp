import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import ColorHelper from '../helpers';

import NavBar from './nav';
import ColorBox from './color-box';
import NotifyCopy from './notify-copy';
import Error404NotFound from './error-404-not-found';

class Palette extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            format: 'HEX',
            copiedColor: null,
            notifyCopy: false
        } // state

        this.stopTransition = () => {
            setTimeout( () => {
                this.setState({ notifyCopy: false })
            }, 2000);
        }
    } // constructor

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

        this.props.history.push(`/palette/${this.props.palette.title.toLowerCase()}/${colorName.toLowerCase()}`);
    } // end of method

    // an EXPERIMENTAL approach to bind 'this'
    changeFormat = () => {
        const newFormat = this.state.format === 'HEX' ? 'rgb' : 'HEX';

        this.setState({ format: newFormat });
    } // end of method

    render() {
        const palette = this.props.palette;

        if (!palette)
            return <Error404NotFound/>

        document.title = `React Colors/> ${palette.title}`;

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
} // end of class

export default Palette;