import React, { Component, createElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import './react-colors.css';
import Transition from './transition';
import Home from './home';
import Error404NotFound from './error-404-not-found';
import ColorPalette from './color-palette';
import CreatePalette from './create-palette';
import ColorDetails from './color-details';

const CONST_MAX_PALETTES = 20;

class App extends Component {
    static defaultProps = {
    } // default properties

    constructor(props) {
        super(props);
        
        this.state = {
            transition: '', // left-to-right
            format: 'hex', // hex, name, rgb
            palettes: [
                { id: 2, title: 'Love', icon: '💕', colors: [ { name: 'blue', hex: '#0000ff'}, { name: 'pink', hex: '#FFC0CB'}, {name: 'purple', hex: '#800080'}] },
                { id: 1, title: 'Sunrise', icon: '🍑', colors: [ {name: 'yellow', hex: '#ffff00'}, {name: 'tomato', hex: '#ff6347'} ]},
                { id: 4, title: 'Tomorrow', icon: '🌤', colors: [ {name: 'green', hex: '#00ff00'}, {name: 'brown', hex: '#964B00'} ]}
            ]
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
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    transition = (direction) => {
        this.setState({ transition: direction }, () => {
            this.stopTransition()
        });
    } // transition

    render() {
         return (
            <div>
                <Transition direction={this.state.transition}/>
                <Switch>
                    <Route
                        exact path="/"
                        render={ (routeProps) =>
                            <Home
                                palettes={this.state.palettes}
                                {...routeProps}
                                transitionBehavior={this.transition}
                            /> }
                    />

                    <Route
                        exact path="/palette/new"
                        render={ (routeProps) => 
                            <CreatePalette
                                transitionBehavior={this.transition}
                                {...routeProps}
                            /> }
                    />

                    <Route
                        exact path="/palette/:paletteTitle"
                        render={ (routeProps) => 
                            <ColorPalette
                                transitionBehavior={this.transition}
                                format={this.state.format}
                                palettes={this.state.palettes}
                                {...routeProps}
                            />}
                    />      

                    <Route
                        exact path="/palette/:paletteTitle/:colorName"
                        render={ (routeProps) => 
                            <ColorDetails
                                transitionBehavior={this.transition}
                                palettes={this.state.palettes}
                                {...routeProps}
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