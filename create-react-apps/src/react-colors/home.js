import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ColorPaletteMini from './color-palette-mini';

document.title = "React Challenge/> React Colors";

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
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    // an EXPERIMENTAL approach to bind 'this'
    viewPalette = (palette) => {
        this.props.history.push(`/palette/${palette.toLowerCase()}`);
    } // end of method

    render() {
        return (
            <react-colors is="react">
                <div className="home-header">
                    <h1>React Colors</h1>
                    <Link to="/palette/create">Create Palette</Link>
                </div>

                <div className="color-palettes">
                    
                    { this.props.palettes.map( (item, i) => 
                        <ColorPaletteMini
                            key={i}
                            data={item}
                            clickBehavior={this.viewPalette}
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