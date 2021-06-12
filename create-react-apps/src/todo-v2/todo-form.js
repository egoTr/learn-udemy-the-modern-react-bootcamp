import React, { useState, forwardRef, useRef } from 'react';

const TodoForm = forwardRef( (props, ref) =>  {
    const [task, setTask] = useState('');
    const refInput = useRef();

    // an EXPERIMENTAL approach to bind 'this'
    function addNewTask(event) {
        event.preventDefault();

        props.submitBehavior(task);

        // reset state
        setTask('');

        // focus the input
        refInput.current.focus();
    } // end of method

    return (
        <form className="outer" onSubmit={addNewTask}>
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