import React, { useEffect, useState, useRef } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { useContext } from "react";
import { AppContext } from "./context/app-context";

const TodoItem = SortableElement( (props) => {  
    const { id, onEdit, onDrag, done, task } = props;
    const { toogleTaskDone, removeTaskById, editTaskById, editCancelTaskById, updateTaskById } = useContext(AppContext);
    
    const [taskThis, setTask] = useState(task);
    const refInput = useRef();
    
    useEffect( () => {
        if (props.onEdit)
            refInput.current.focus();
    }, [props.onEdit])

    function editTaskCancel(event) {
        event.preventDefault();
        
        editCancelTaskById(id);
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

        updateTaskById(id, taskThis);
    } // updateTask

    return (
        <todo-item onedit={`${onEdit}`} ondrag={`${onDrag}`} title="Drag-drop to re-order">
            {!onEdit && 
            <div>
                <todo-text
                    title={done ? "Click to set this task UNDONE" : "Click to set this task DONE"}
                    done={`${done}`}
                    onClick={() => toogleTaskDone(id)}
                    >
                    {taskThis}
                </todo-text>
                <todo-buttons>
                    <button title="Edit" onClick={ () => editTaskById(id) }>📝</button>
                    <button title="Remove" onClick={ () => removeTaskById(id) }>❌</button>
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