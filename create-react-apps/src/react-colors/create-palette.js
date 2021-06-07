import React, { Component } from 'react';

import NavBar from './nav';

class CreatePalette extends Component {
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
        document.title = "React Colors/> Create Palette";
    } // componentDidMount

    async componentDidUpdate(prevProps, prevStata) {
    } // componentDidUpdate

    goHome = () => {
        this.props.transitionBehavior('right-to-left');

        this.props.history.push(`/`);
    } // end of method

    render() {
        return (
            <NavBar goHomeBehavior={this.goHome}/>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default CreatePalette;