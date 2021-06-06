import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './react-colors.css';
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
            palettes: [
                { id: 2, title: 'Love', icon: '💕', colors: [ { name: 'blue', hex: '#0000ff'}, { name: 'pink', hex: '#FFC0CB'}, {name: 'purple', hex: '#800080'}] },
                { id: 1, title: 'Sunrise', icon: '🍑', colors: [ {name: 'yellow', hex: '#ffff00'}, {name: 'tomato', hex: '#ff6347'} ]},
                { id: 4, title: 'Tomorrow', icon: '🌤', colors: [ {name: 'green', hex: '#00ff00'}, {name: 'brown', hex: '#964B00'} ]}
            ]
        } // state

        // this.methodName2 = this.methodName2.bind(this); // bind 'this' from a class-inside method
        // this.methodName3 = methodName3.bind(this); // bind 'this' from a class-outside method

    } // constructor

    async componentDidMount() {
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    render() {
         return (
            <div>
                <Switch>
                    <Route exact path="/" render={ (routeProps) => <Home palettes={this.state.palettes} {...routeProps} /> }/>

                    <Route
                        exact path="/palette/create"
                        component={CreatePalette}
                    />

                    <Route
                        exact path="/palette/:paletteTitle"
                        render={ (routeProps) => <ColorPalette palettes={this.state.palettes} {...routeProps}/> }
                    />

                    <Route
                        exact path="/palette/:paletteTitle/:colorName"
                        render={ (routeProps) => <ColorDetails palettes={this.state.palettes} {...routeProps}/> }
                    />

                    {/* Put 404 error document at the end of routing */}
                    {/* without path specified */}
                    <Route render={ ()=> <Error404NotFound/>}/>
                </Switch>
            </div>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default App;