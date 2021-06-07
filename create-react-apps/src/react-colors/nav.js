import React, { Component } from 'react';

class NavBar extends Component {
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

    goHome = () => {
        if (this.props.goHomeBehavior)
            this.props.goHomeBehavior();
    } // goHome

    createPalette = () => {
        this.props.createPaletteBehavior();
    } // createPalette

    changeFormat = () => {
        this.props.changeFormatBehavior();
    } // changeFormat

    render() {
        const style = { color: this.props.color };

        const formatSpan = <span
                                style={style}
                                title="Change color format"
                                className="color-format"
                                onClick={this.changeFormat}>
                                {this.props.format}
                            </span>;
        return (
            <nav>
                <h2 title="Home" className="nav-title" onClick={this.goHome}>React Colors</h2>
                {this.props.showFormat && formatSpan}
                {this.props.showCreate && <span className="nav-create-palette" onClick={this.createPalette}>Create Palette</span>}
            </nav>
         ) // return
    } // render

    componentWillUnmount() {
    } // componentWillUnmount

    componentDidUnMount() {
    } // componentDidUnMount
} // end of class

export default NavBar;