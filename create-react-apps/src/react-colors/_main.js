import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './css/_main.css';
import Transition from './transition';
import Home from './home';
import Error404NotFound from './error-404-not-found';
import Palette from './palette';
import PaletteCreate from './palette-create';
import ColorDetails from './color-details';

const CONST_LOCAL_STORAGE_NAME = "react-colors.localStorage";

class App extends Component {
    static defaultProps = {
        palettes: [
            {
                id: 0,
                title: 'Flat UI Colors',
                icon: '🎨',
                colors: [ 
                    { id: 0, name: "Turquoise", hex: "#1abc9c" },
                    { id: 1, name: "Emerald", hex: "#2ecc71" },
                    { id: 2, name: "PeterRiver", hex: "#3498db" },
                    { id: 3, name: "Amethyst", hex: "#9b59b6" },
                    { id: 4, name: "WetAsphalt", hex: "#34495e" },
                    { id: 5, name: "GreenSea", hex: "#16a085" },
                    { id: 6, name: "Nephritis", hex: "#27ae60" },
                    { id: 7, name: "BelizeHole", hex: "#2980b9" },
                    { id: 8, name: "Wisteria", hex: "#8e44ad" },
                    { id: 9, name: "MidnightBlue", hex: "#2c3e50" },
                    { id: 10, name: "SunFlower", hex: "#f1c40f" },
                    { id: 11, name: "Carrot", hex: "#e67e22" },
                    { id: 12, name: "Alizarin", hex: "#e74c3c" },
                    { id: 13, name: "Clouds", hex: "#ecf0f1" },
                    { id: 14, name: "Concrete", hex: "#95a5a6" },
                    { id: 15, name: "Orange", hex: "#f39c12" },
                    { id: 16, name: "Pumpkin", hex: "#d35400" },
                    { id: 17, name: "Pomegranate", hex: "#c0392b" },
                    { id: 18, name: "Silver", hex: "#bdc3c7" },
                    { id: 19, name: "Asbestos", hex: "#7f8c8d" }
                ]}
        ]
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            transition: '', // left-to-right
            format: 'hex', // hex, name, rgb
            palettes: this.props.palettes
        } // state

        this.stopTransition = () => {
            setTimeout(() => {
                this.setState({ transition: '' });
            }, 1000);
        }

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
        let palettes;

        if ( localStorage.getItem(CONST_LOCAL_STORAGE_NAME) )
            palettes = JSON.parse( localStorage.getItem(CONST_LOCAL_STORAGE_NAME) );
        
        palettes = (palettes && palettes.length > 0) ? palettes : this.props.palettes; 

        this.setState({ palettes }, () => {
            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(palettes) );
        });
    } // componentDidMount

    // not allow duplicate on palette's name
    checkPaletteValid = (title) => {
        const inValidPaletteName = this.state.palettes.some( palette => palette.title.toUpperCase() === title.toUpperCase() );
        if (inValidPaletteName)
            return { status: false, message: 'Palette name existed.' };

        return { status: true, message: '' }
    } // checkColorValid

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    transition = (direction) => {
        this.setState({ transition: direction }, () => {
            this.stopTransition()
        });
    } // transition

    createPalette = (palette) => {
        const newPalette = {...palette, id: Date.now(), icon: '🎨'};

        this.setState( currentState => (
            { palettes: [...currentState.palettes, newPalette] } // push(), pop()... not work for array states
        ), () => {
            //callback
            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.palettes) );
        }) // setState
    } // createPalette

    removePalette = (paletteId) => {
        const newPalettes = this.state.palettes.filter( palette => palette.id !== paletteId );
        
        this.setState({ palettes: newPalettes }, () => {
            localStorage.setItem( CONST_LOCAL_STORAGE_NAME, JSON.stringify(this.state.palettes) );
        });
    } // removePalette

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
                            <PaletteCreate
                                {...routeProps}
                                transitionBehavior={this.transition}
                                checkPaletteValidBehavior={this.checkPaletteValid}
                                createPaletteBehavior={this.createPalette}
                            /> }
                    />

                    <Route
                        exact path="/palette/:paletteTitle"
                        render={ (routeProps) => 
                            <Palette
                                {...routeProps}
                                transitionBehavior={this.transition}
                                format={this.state.format}
                                palettes={this.state.palettes}
                            />}
                    />      

                    <Route
                        exact path="/palette/:paletteTitle/:colorName"
                        render={ (routeProps) => 
                            <ColorDetails
                                {...routeProps}
                                transitionBehavior={this.transition}
                                palettes={this.state.palettes}
                            />}
                    />

                    {/* Put 404 error document at the end of routing */}
                    {/* without path specified */}
                    <Route render={ ()=> <Error404NotFound/>}/>
                </Switch>
            </div>
         ) // return
    } // render

    componentWillUnmount() {
        clearTimeout(this.stopTransition);
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default App;