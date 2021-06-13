import React, { useEffect } from 'react';
import useAppState from './hooks/useAppState';

import './todo.css';
import TodoForm from './todo-form';
import TodoList from './todo-list';
import TodoItem from './todo-item';

const CONST_TODOS_LOCAL_STORAGE_NAME = "todos.localStorage";

document.title = "React Challenge/> Todo - v2";

function ToDo() {
    const cachedData = localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME);
    const initTasks = cachedData ? JSON.parse(cachedData) : [];

    const [app, addTodo, toogleTaskDone, removeTaskById, editTaskById, editCancelTaskById, updateTaskById, dragDropStart, dragDropEnd]
        = useAppState({ onEdit: false, onDrag: false, tasks: initTasks });

    useEffect( () => {
        localStorage.setItem( CONST_TODOS_LOCAL_STORAGE_NAME, JSON.stringify(app.tasks) );
    }, [app.tasks]);

    return (
        <todo is="react">
            <h1>TODOs</h1>
            <TodoForm submitBehavior={addTodo}/>

            <hr/>
            
            { app.tasks.length === 0 && <p>No tasks.</p>}

            <TodoList
                axis="xy"
                onSortMove={dragDropStart}
                onSortEnd={dragDropEnd}
                distance={20}>

                { app.tasks.map( (item, i) =>
                    <TodoItem
                        key={item.id}           /* For re-rendering the children :(((( */
                        id={item.id}

                        index={i}               /* w/ react-sortable-hoc */
                        disabled={app.onEdit}   /* w/ react-sortable-hoc */
                        onDrag={app.onDrag}     /* w/ react-sortable-hoc */
                        
                        task={item.task}
                        done={item.done}
                        onEdit={item.onEdit}
                        
                        toogleBehavior={toogleTaskDone}
                        removeBehavior={removeTaskById}
                        editBehavior={editTaskById}
                        editCancelBehavior={editCancelTaskById}
                        updateBehavior={updateTaskById}
                    />
                )}
            </TodoList>
        </todo>
    ) // return    
} // end of function

export default ToDo;