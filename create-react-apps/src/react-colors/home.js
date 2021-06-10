import React, { Component } from 'react';

import NavBar from './nav';
import PaletteMini from './palette-mini';

class Home extends Component {
    // an EXPERIMENTAL approach to bind 'this'
    viewPalette = (palette) => {
        this.props.transitionBehavior('left-to-right');

        this.props.history.push(`/palette/${palette.toLowerCase()}`);
    } // end of method

    editPalette = (palette) => {
        this.props.transitionBehavior('left-to-right');

        this.props.history.push(`/palette/${palette.toLowerCase()}/edit`);
    } // end of method

    createPalette = () => {
        this.props.transitionBehavior('left-to-right');

        this.props.history.push(`/palette/new`);
    } // createPalette

    removePalette = (paletteId) => {
        this.props.removePaletteBehavior(paletteId);
    } // removePalette

    render() {
        document.title = "React Challenge/> React Colors";
        
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
                        viewPaletteBehavior={this.viewPalette}
                        editPaletteBehavior={this.editPalette}
                        removePaletteBehavior={this.removePalette}
                    />
                )}
            </div>
            </react-colors> 
         ) // return
    } // render
} // end of class

export default Home;