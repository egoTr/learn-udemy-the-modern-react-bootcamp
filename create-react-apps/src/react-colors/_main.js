import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CommonPalettes from './data/common-palettes';

import './_main.css';
import Transition from './transition';
import Home from './home';
import Error404NotFound from './error-404-not-found';
import Palette from './palette';
import PaletteCreateEdit from './palette-create-edit';
import ColorDetails from './color-details';

const CONST_LOCAL_STORAGE_NAME = "react-colors.localStorage";

class App extends Component {
    constructor(props) {
        super(props);
        
        const savedPalettes = localStorage.getItem(CONST_LOCAL_STORAGE_NAME);
        this.state = {
            transition: '', // left-to-right, right-to-left
            palettes: savedPalettes ? JSON.parse(savedPalettes) : CommonPalettes
        } // state

        this.stopTransition = () => {
            setTimeout(() => {
                this.setState({ transition: '' });
            }, 400); // this should be LESS THAN animation's duration
        }
    } // constructor

    transition = (direction) => {
        this.setState({ transition: direction }, () => {
            this.stopTransition()
        });
    } // transition

    // not allow duplicate on palette's name
    checkPaletteValid = (id, title) => {
        let inValidPaletteName;
        
        if (id)
            inValidPaletteName = this.state.palettes.some( palette => palette.title.toUpperCase() === title.toUpperCase() && palette.id !== id);
        else
            inValidPaletteName = this.state.palettes.some( palette => palette.title.toUpperCase() === title.toUpperCase());
        
        if (inValidPaletteName)
            return { status: false, message: `Palette name '${title}' not available.` };

        return { status: true, message: '' }
    } // checkColorValid

    createPalette = (palette) => {
        const newPalette = {...palette, id: Date.now(), icon: '🎨'};

        this.setState( currentState => (
            { palettes: [...currentState.palettes, newPalette] } // push(), pop()... not work for array states
        ), () => {
            //callback
            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.palettes) );
        }) // setState
    } // createPalette

    savePalette = (id, title, colors) => {
        const newPalettes = this.state.palettes.map(palette =>
            palette.id === id ? {...palette, title, colors} : palette
        );

        this.setState({ palettes: newPalettes }, () => {
            //callback
            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.palettes) );
        }) // setState
    } // savePalette

    removePalette = (paletteId) => {
        const newPalettes = this.state.palettes.filter( palette => palette.id !== paletteId );
        
        this.setState({ palettes: newPalettes }, () => {
            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.palettes) );
        });
    } // removePalette

    getPalette = (paletteTitle) => {
        const result = this.state.palettes.filter( palette => palette.title.toLowerCase() === paletteTitle.toLowerCase() );
        if (!result)
            return null;
        
        return result[0];
    } // getPalette

    getColor = (paletteTitle, colorName) => {
        const palette = this.getPalette(paletteTitle);
        if (!palette)
            return null;
        
        const result = palette.colors.filter( color => color.name.toLowerCase() === colorName.toLowerCase() );
        if (!result)
            return null;
        
        return { palette: palette.title, color: result[0]};
    } // getColor

    render() {
         return (
            <div>
                <Transition direction={this.state.transition}/>

                <Switch>
                    <Route
                        exact path="/"
                        render={ (routeProps) =>
                            <Home
                                {...routeProps}
                                palettes={this.state.palettes}
                                transitionBehavior={this.transition}
                                removePaletteBehavior={this.removePalette}
                            /> }
                    />

                    <Route
                        exact path="/palette/new"
                        render={ (routeProps) => 
                            <PaletteCreateEdit
                                {...routeProps}
                                edit={false}
                                transitionBehavior={this.transition}
                                checkPaletteValidBehavior={this.checkPaletteValid}
                                createPaletteBehavior={this.createPalette}
                            /> }
                    />

                    <Route
                        exact path="/palette/:paletteTitle/edit"
                        render={ (routeProps) => 
                            <PaletteCreateEdit
                                {...routeProps}
                                edit={true}
                                palette={this.getPalette(routeProps.match.params.paletteTitle)}
                                transitionBehavior={this.transition}
                                checkPaletteValidBehavior={this.checkPaletteValid}
                                savePaletteBehavior={this.savePalette}
                            /> }
                    />

                    <Route
                        exact path="/palette/:paletteTitle"
                        render={ (routeProps) => 
                            <Palette
                                {...routeProps}
                                transitionBehavior={this.transition}
                                format={this.state.format}
                                palette={this.getPalette(routeProps.match.params.paletteTitle)}
                            />}
                    />      

                    <Route
                        exact path="/palette/:paletteTitle/:colorName"
                        render={ (routeProps) => 
                            <ColorDetails
                                {...routeProps}
                                transitionBehavior={this.transition}
                                color={this.getColor(routeProps.match.params.paletteTitle, routeProps.match.params.colorName)}
                            />}
                    />

                    {/* Put 404 error document at the end of routing */}
                    {/* without path specified */}
                    <Route render={ ()=> <Error404NotFound/>}/>
                </Switch>
            </div>
         ) // return
    } // render
} // end of class

export default App;