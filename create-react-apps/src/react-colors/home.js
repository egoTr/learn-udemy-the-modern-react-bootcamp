import React, { Component } from 'react';

import NavBar from './nav';
import PaletteMini from './palette-mini';

class Home extends Component {
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
        document.title = "React Challenge/> React Colors";
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    viewPalette = (palette) => {
        this.props.transitionBehavior('left-to-right');

        this.props.history.push(`/palette/${palette.toLowerCase()}`);
    } // end of method

    createPalette = () => {
        this.props.transitionBehavior('left-to-right');

        this.props.history.push(`/palette/new`);
    } // createPalette

    removePalette = (paletteId) => {
        this.props.removePaletteBehavior(paletteId);
    } // removePalette

    render() {
        return (
            <react-colors is="react">
                <NavBar
                    createPaletteBehavior={this.createPalette}
                    showCreate={true}
                />
                
                <div className="color-palettes">
                
                { this.props.palettes.map( (item, i) => 
                    <PaletteMini
                        key={i}
                        data={item}
                        clickBehavior={this.viewPalette}
                        removePaletteBehavior={this.removePalette}
                    />
                )}
            </div>
            </react-colors> 
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default Home;