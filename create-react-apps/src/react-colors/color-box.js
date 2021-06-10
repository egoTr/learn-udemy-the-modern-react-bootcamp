import React, {memo} from 'react';
import styled from 'styled-components';

const ColorCopyButton = styled.span`
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;

    position: absolute;
    width: 80px;
    height: 40px;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -40px; // -20px = -height/2 ; -40px = -width/2 //

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
`;

const Box = styled.div`
    background-color: ${props => props.color};
    position: relative;
    --color-box-width: 20%;
    width: var(--color-box-width);
    height: 25%;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;

    &:hover ${ColorCopyButton} {
        visibility: visible;
    }
`;

const ColorFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
`;

const ColorName = styled.span`
    text-transform: uppercase;
`;

const ColorDetails = styled.span`
    color: white;

    &:hover {
        text-decoration: underline;
    }
`;
function ColorBox(props) {
    function copyColor() {
        props.copyColorBehavior( props.color.toUpperCase() );
    } // copyColor

    // an EXPERIMENTAL approach to bind 'this'
    function viewColor(event) {
        event.stopPropagation();

        props.viewColorBehavior(props.name);
    } // end of method

    return (
        <Box color={props.color} title={props.name.toUpperCase()} onClick={copyColor}>
            <ColorCopyButton title="Copy to clipboard">COPY</ColorCopyButton>
            <ColorFooter>
                <ColorName>{props.name}</ColorName>
                <ColorDetails title="View details" onClick={viewColor}>Details</ColorDetails>
            </ColorFooter>
        </Box>
        ) // return
} // end of class

export default memo(ColorBox);