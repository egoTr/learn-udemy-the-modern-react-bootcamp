import React, { Component } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    z-index: 2;
    background-color: #f8f8f8;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 10px 17px -8px rgba(0,0,0,0.75);

    & span {
        margin-left: 10px;
    }
`;

const NavTitle = styled.h2`
    color: var(--app-color-primary) !important;
    text-decoration: none !important;
    cursor: pointer;
`;

const NavCreatePalette = styled.span`
    color: var(--app-color-secondary) !important;
    text-decoration: underline !important;
    cursor: pointer;
`;

const NavColorFormat = styled.span`
    padding: 5px 10px;
    flex-shrink: 1;

    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }
`;

class NavBar extends Component {
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

        const formatSpan = <NavColorFormat
                                style={style}
                                title="Change color format"
                                onClick={this.changeFormat}>
                                {this.props.format}
                            </NavColorFormat>;
        return (
            <Nav>
                <NavTitle title="Home" onClick={this.goHome}>React Colors</NavTitle>
                {this.props.showFormat && formatSpan}
                {this.props.showCreate && <NavCreatePalette onClick={this.createPalette}>Create Palette</NavCreatePalette>}
            </Nav>
         ) // return
    } // render
} // end of class

export default NavBar;