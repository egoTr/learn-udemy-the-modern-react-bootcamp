import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const ColorBoxCreate = SortableElement(props => {
    const { name, color, removeColorBehavior } = props;

    const style = {
        backgroundColor: color
    };

    return (
        <div className="color-box-create" style={style} title={name.toUpperCase()}>
            <div className="color-create-footer">
                <span className="color-create-name">{name}</span>
                <span className="color-remove"><svg onClick={removeColorBehavior} className="color-remove-svg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ddd">
                    <title>Remove color</title>
                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                </svg></span>
            </div>
        </div>
    ) // return
}) // end of function

export default ColorBoxCreate;