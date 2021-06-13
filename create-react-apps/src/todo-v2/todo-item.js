import React, { useEffect, useState, useRef } from 'react';
import { SortableElement } from 'react-sortable-hoc';

const TodoItem = SortableElement( (props) => {  
    const { id, onEdit, onDrag, done, task, toogleBehavior, editBehavior, editCancelBehavior, updateBehavior, removeBehavior } = props;
    
    const [taskThis, setTask] = useState(task);
    const refInput = useRef();
    
    useEffect( () => {
        if (props.onEdit)
            refInput.current.focus();
    }, [props.onEdit])

    function editTaskCancel(event) {
        event.preventDefault();
        
        editCancelBehavior(id);
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

        updateBehavior(id, taskThis);
    } // updateTask

    return (
        <todo-item onedit={`${onEdit}`} ondrag={`${onDrag}`} title="Drag-drop to re-order">
            {!onEdit && 
            <div>
                <todo-text
                    title={done ? "Click to set this task UNDONE" : "Click to set this task DONE"}
                    done={`${done}`}
                    onClick={() => toogleBehavior(id)}
                    >
                    {taskThis}
                </todo-text>
                <todo-buttons>
                    <button title="Edit" onClick={ () => editBehavior(id) }>📝</button>
                    <button title="Remove" onClick={ () => removeBehavior(id) }>❌</button>
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

export default TodoItem;