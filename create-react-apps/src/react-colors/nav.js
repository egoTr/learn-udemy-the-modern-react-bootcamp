import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
    } // constructor

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
} // end of class

export default NavBar;