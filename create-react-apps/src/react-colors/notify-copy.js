import React from 'react';

import styled from 'styled-components';
const NotifyCopyOuter = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 3;
    background-color: ${props => props.color ? props.color: 'white'};
    position: fixed; top: 0; left: 0;
    width: 100%;
    box-shadow: 0px 10px 17px -8px rgba(0,0,0,0.75);

    opacity: ${props => props.show ? '1' : '0'};
    transition: all 2s ease-in-out;`;

const NotifyCopyInner = styled.div`
    color: white;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;`;

function NotifyCopy(props) {
    return (
        <NotifyCopyOuter color={props.color} show={props.toShowed}>
            <NotifyCopyInner>
                Copied color&nbsp;
                <strong>{props.color}</strong>
                &nbsp;to clipboard
            </NotifyCopyInner>
        </NotifyCopyOuter>
        ) // return
} // end of class

export default NotifyCopy;