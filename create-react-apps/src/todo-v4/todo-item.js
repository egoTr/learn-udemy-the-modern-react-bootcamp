import React, { useEffect, useState, useRef } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { useContext } from "react";
import { DispatchContext } from "./hooks/app-context";

const TodoItem = SortableElement( (props) => {  
    const { id, onEdit, onDrag, done, task } = props;
    const dispatch = useContext(DispatchContext);
    
    const [taskThis, setTask] = useState(task);
    const refInput = useRef();
    
    useEffect( () => {
        if (props.onEdit)
            refInput.current.focus();
    }, [props.onEdit])

    function editTaskCancel(event) {
        event.preventDefault();
        
        dispatch({ type: 'EDIT_CANCEL', id });
    } // editTaskCancel

    function updateTask(event) {
        event.preventDefault();

        // default validation not fired :((
        const form = document.getElementById(`form${id}`);
        const validationResult = form.checkValidity();

        if (validationResult === false) {
            setTask(task);
            
            return;
        } // if

        dispatch({ type: 'EDIT_SUBMIT', id, task: taskThis });
    } // updateTask

    return (
        <todo-item onedit={`${onEdit}`} ondrag={`${onDrag}`} title="Drag-drop to re-order">
            {!onEdit && 
            <div>
                <todo-text
                    title={done ? "Click to set this task UNDONE" : "Click to set this task DONE"}
                    done={`${done}`}
                    onClick={() => dispatch({ type: 'TOGGLE', id })}
                    >
                    {taskThis}
                </todo-text>
                <todo-buttons>
                    <button title="Edit" onClick={ () => dispatch({ type: 'EDIT_START', id }) }>📝</button>
                    <button title="Remove" onClick={ () => dispatch({ type: 'REMOVE', id }) }>❌</button>
                </todo-buttons>
            </div>
            }

            {onEdit && 
            <form id={`form${id}`} className="inner" onSubmit={updateTask}>
                <input
                    ref={refInput}
                    name="task"
                    type="text"
                    required minLength="2" maxLength="128"
                    value={taskThis}
                    onChange={ (event) => setTask(event.target.value) }
                />
                <todo-buttons-form>
                    <button title="Update" onClick={updateTask}>✔</button>
                    <button title="Cancel" onClick={editTaskCancel}>❌</button>
                </todo-buttons-form>
            </form>
            }
        </todo-item>
    ) // return
}) // end of function

/*
function areTasksEqual(prevTaskProps, curTaskProps) {
    return (
        prevTaskProps.index === curTaskProps.index && 
        prevTaskProps.id === curTaskProps.id && 
        prevTaskProps.task === curTaskProps.task && 
        prevTaskProps.done === curTaskProps.done && 
        prevTaskProps.onEdit === curTaskProps.onEdit &&
        prevTaskProps.ondrag === curTaskProps.ondrag
    )
} // areTasksEqual

// https://dmitripavlutin.com/use-react-memo-wisely/
// If the component isn’t heavy, most likely you don’t need React.memo()
// Don’t use memoization if you can’t quantify the performance gains
// export default React.memo(TodoItem, areTasksEqual);
*/

export default React.memo(TodoItem);