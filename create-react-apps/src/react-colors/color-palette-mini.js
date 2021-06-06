import React, { Component } from 'react';
import ColorBoxMini from './color-box-mini';

const CONST_MAX_BOX_PER_PALETTE = 20;

class ColorPaletteMini extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            colors: []
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        let myColors = [];

        const { colors } = this.props.data;

        // fill colors upto CONST_MAX_BOX_PER_PALETTE
        for (var i = 0; i < CONST_MAX_BOX_PER_PALETTE; i++)
            myColors.push(colors[i] ? colors[i] : {name: 'Default', hex: "#f8f8f8"});

         this.setState({ colors: myColors });
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    viewPalette = () => {
        this.props.clickBehavior(this.props.data.title);
    } // end of method

    render() {
        const { title, icon } = this.props.data;

        return (
            <color-palette-mini is="react" title={title} onClick={this.viewPalette}>
                <div className="color-palette-mini-container">
                    { this.state.colors.map( (item, i) => <ColorBoxMini key={i} color={item.hex} />) }
                </div>

                <div className="color-palette-mini-footer">
                    <h4>{title}</h4>
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

export default ColorPaletteMini;