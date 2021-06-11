import React, { memo, useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

function TodoItem (props) {  
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id}); console.log(props.id);
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    const { id, onEdit, done, task, toogleBehavior, editBehavior, editCancelBehavior, updateBehavior, removeBehavior } = props;
    
    const [taskMe, setTask] = useState(task);

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

        updateBehavior(id, taskMe);
    } // updateTask

    return (
    <div className="todo-item"
        onedit={`${onEdit}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
    >

        {!onEdit && 
        <div>
            <todo-text
                title={done ? "Click to set this task UNDONE" : "Click to set this task DONE"}
                done={`${done}`}
                /*onClick={() => toogleBehavior(id)} */
                >
                {taskMe}
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
                /* ref={ref} */
                name="task"
                type="text"
                required minLength="2" maxLength="128"
                value={taskMe}
                onChange={ (event) => setTask(event.target.value) }
            />
            <todo-buttons-form>
                <button title="Update" onClick={updateTask}>✔</button>
                <button title="Cancel" onClick={editTaskCancel}>❌</button>
            </todo-buttons-form>
        </form>
        }
    </div>
    ) // return
} // end of function

export default memo(TodoItem);