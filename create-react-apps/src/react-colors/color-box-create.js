import React, { memo } from 'react';
import {SortableElement} from 'react-sortable-hoc';
import styled from 'styled-components';

const ColorCreate = styled.div`
    width: 20%;
    height: 25%;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: move;

    &:hover .color-remove-svg {
        fill: white;
        transform: scale(1.5);
    }
`;

const ColorCreateFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
`;

const ColorCreateName = styled.span`
    text-transform: uppercase;
    cursor: default;`
;

const ColorCreateRemove = styled.span`
    cursor: pointer;
`;

const ColorBoxCreate = SortableElement(props => {
    const { name, color, removeColorBehavior } = props;

    const style = {
        backgroundColor: color
    };

    return (
        <ColorCreate style={style} title={name.toUpperCase()}>
            <ColorCreateFooter>
                <ColorCreateName>{name}</ColorCreateName>
                <ColorCreateRemove>
                    <svg onClick={removeColorBehavior} className="color-remove-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ddd">
                        <title>Remove color</title>
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                    </svg>
                </ColorCreateRemove>
            </ColorCreateFooter>
        </ColorCreate>
    ) // return
}) // end of function

function arePropsEqual(prevProps, nextProps) {
	return prevProps.id === nextProps.id; 
}

// Wrap component using `React.memo()` and pass `arePropsEqual`
export default memo(ColorBoxCreate, arePropsEqual);