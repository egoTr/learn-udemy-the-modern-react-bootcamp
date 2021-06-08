import React, { Component } from 'react';
import ColorBoxMini from './color-box-mini';

const CONST_MAX_BOX_PER_PALETTE = 20;

class PaletteMini extends Component {
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

    fillPalette = () => {
        let newColors = [];

        const { colors } = this.props.data;

        // fill colors upto CONST_MAX_BOX_PER_PALETTE
        for (var i = 0; i < CONST_MAX_BOX_PER_PALETTE; i++)
            newColors.push(colors[i] ? colors[i] : {name: 'Default', hex: "#f8f8f8"});

        return newColors;
    } // fillPalette

    // an EXPERIMENTAL approach to bind 'this'
    viewPalette = () => {
        this.props.clickBehavior(this.props.data.title);
    } // end of method

    removePalette = (event) => {
        event.stopPropagation();
        
        this.props.removePaletteBehavior(this.props.data.id);
    } // removePalette

    render() {
        const { title, icon } = this.props.data;
        const colors = this.fillPalette();

        return (
            <color-palette-mini is="react" title={title} onClick={this.viewPalette}>
                <div className="color-palette-mini-container">
                    { colors.map( (item, i) => <ColorBoxMini key={i} color={item.hex} />) }
                </div>

                <div className="color-palette-mini-footer">
                    <h4>{title}</h4>
                    <span className="color-palette-mini-remove"><svg onClick={this.removePalette} className="color-palette-mini-remove-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="red">
                        <title>Remove palette</title>
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                    </svg></span>
                    <span>{icon}</span>
                </div>
            </color-palette-mini>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default PaletteMini;