import React, { PureComponent } from 'react';

import styled from 'styled-components';
const PaletteMiniEdit = styled.span`
    visibility: hidden;
    fill: var(--app-color-secondary);

    width: 48px;
    height: 48px;
    display: flex; justify-content: center; align-items: center;
    
    &:hover {
        background-color: #f8f8ff;
        border-radius: 50%;
    }`;

const PaletteMiniRemove = styled.span`
    visibility: hidden;
    fill: red;

    width: 48px;
    height: 48px;
    display: flex; justify-content: center; align-items: center;

    &:hover {
        background-color: #f8f8ff;
        border-radius: 50%;
    }`;

const PaletteMiniStyled = styled.div`
    background-color: white;
    margin: 20px 20px 0 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    cursor: pointer;
    
    &:hover{
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    }
    
    &:hover ${PaletteMiniEdit} { visibility: visible; }
    &:hover ${PaletteMiniRemove} { visibility: visible; }`;

const PaletteMiniContainer = styled.div`    
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    border-radius: 5px;`;

const PaletteMiniFooter = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;`;    

const PaletteMiniButtons = styled.div`
    display: flex;`

const ColorBoxMiniStyled = styled.div`
    background-color: ${props => props.color};
    width: 20%;
    height: 3rem;
    border-radius: 5px;`;

const CONST_MAX_BOX_PER_PALETTE = 20;

const ColorBoxMini = (props) => <ColorBoxMiniStyled color={props.color}></ColorBoxMiniStyled>
class PaletteMini extends PureComponent {
    fillPalette = () => {
        let newColors = [];

        const { colors } = this.props.data;

        // fill colors upto CONST_MAX_BOX_PER_PALETTE
        for (var i = 0; i < CONST_MAX_BOX_PER_PALETTE; i++)
            newColors.push(colors[i] ? colors[i] : {name: 'Default', hex: "#f8f8f8"});

        return newColors;
    } // fillPalette

    // an EXPERIMENTAL approach to bind 'this'
    viewPalette = () => {
        this.props.viewPaletteBehavior(this.props.data.title);
    } // end of method

    editPalette = (event) => {
        event.stopPropagation();

        this.props.editPaletteBehavior(this.props.data.title);
    } // end of method

    removePalette = (event) => {
        event.stopPropagation();
        
        this.props.removePaletteBehavior(this.props.data.id);
    } // removePalette

    render() {
        const { title } = this.props.data;
        const colors = this.fillPalette();

        return (
            <PaletteMiniStyled title={title} onClick={this.viewPalette}>
                <PaletteMiniContainer>
                    { colors.map( (item, i) => <ColorBoxMini key={i} color={item.hex} />) }
                </PaletteMiniContainer>

                <PaletteMiniFooter>
                    <h4>{title}</h4>
                    {/* <span>{icon}</span> */}
                    
                    <PaletteMiniButtons>
                        <PaletteMiniEdit>
                            <svg onClick={this.editPalette} className="color-palette-mini-edit-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                                <title>Edit palette</title>
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
                            </svg>
                        </PaletteMiniEdit>

                        <PaletteMiniRemove>
                            <svg onClick={this.removePalette} className="color-palette-mini-remove-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="red">
                                <title>Remove palette</title>
                                <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                            </svg>
                        </PaletteMiniRemove>
                    </PaletteMiniButtons>
                </PaletteMiniFooter>
            </PaletteMiniStyled>
         ) // return
    } // render
} // end of class

export default PaletteMini;