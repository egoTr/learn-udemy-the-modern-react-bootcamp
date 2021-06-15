import React, { useState, forwardRef, useRef } from 'react';
import { useContext } from "react";
import { DispatchContext } from "./hooks/app-context";

const TodoForm = forwardRef( (props, ref) =>  {
    const dispatch = useContext(DispatchContext);

    const [task, setTask] = useState('');
    const refInput = useRef();

    // an EXPERIMENTAL approach to bind 'this'
    function handleSubmit(event) {
        event.preventDefault();

        dispatch({ type: 'ADD', task });

        // reset state
        setTask('');

        // focus the input
        refInput.current.focus();
    } // end of method

    return (
        <form className="outer" onSubmit={handleSubmit}>
            <input
                ref={refInput}
                type="text" name="task"
                required
                autoFocus
                minLength="2" maxLength="128"
                placeholder="Task"
                value={task}
                onChange={ (event) => setTask(event.target.value) }
            />
            <button title="Add task">➕</button>
        </form>
    ) // return
}) // end of class

export default TodoForm;