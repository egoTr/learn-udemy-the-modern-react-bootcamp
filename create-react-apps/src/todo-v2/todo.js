import React, { useState, useEffect } from 'react';
import arrayMove from 'array-move';

import './todo.css';
import TodoForm from './todo-form';
import TodoList from './todo-list';
import TodoItem from './todo-item';

const CONST_TODOS_LOCAL_STORAGE_NAME = "todos.localStorage";

document.title = "React Challenge/> Todo - v2";

function ToDo() {
    const [initialized, setInit] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect( () => {
        if ( !initialized && localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME) ) {
            const tasks = JSON.parse( localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME) );

            setTasks(tasks);
        } // if
        setInit(true);
    }, [initialized]);

    useEffect( () => {
        if (initialized)
            localStorage.setItem( CONST_TODOS_LOCAL_STORAGE_NAME, JSON.stringify(tasks) );
    }, [initialized, tasks]);

    function addTodo(task) {
        const newTask = {task, id: Date.now(), done: false, onEdit: false};

        setTasks([...tasks, newTask]);
    } // end of method

    function toogleTaskDone(taskId) {
        if (onEdit)
            return;
        
        const newTasks = tasks.map( task => (
            task.id === taskId ? {...task, done: !task.done} : task
        ));

        setTasks(newTasks);
    } // removeTaskById

    function removeTaskById(taskId)  {
        if (onEdit)
            return;

        setTasks( tasks.filter(task => task.id !== taskId) );
    } // removeTaskById

    function editTaskById(taskId) {
        if (onEdit)
            return;
        
        const newTasks = tasks.map( task => (
            task.id === taskId ? {...task, onEdit: true} : task
        ));

        setOnEdit(true);
        setTasks(newTasks);
    } // editTaskById

    function editCancelTaskById(taskId)  {
        const newTasks = tasks.map( task => (
            task.id === taskId ? {...task, onEdit: false} : task
        ));

        setOnEdit(false);
        setTasks(newTasks);
    } // editCancelTaskById

    function updateTaskById(taskId, taskText) {
        const newTasks = tasks.map( task => (
            task.id === taskId ? {...task, task: taskText, onEdit: false} : task
        ));

        setOnEdit(false);
        setTasks(newTasks);
    } // updateTaskById

    return (
        <todo is="react">
            <h1>TODOs</h1>
            <TodoForm submitBehavior={addTodo}/>

            <hr/>
            
            { tasks.length === 0 && <p>No tasks.</p>}

            <TodoList
                axis="xy"
                onSortEnd={dragDropEnd}
                distance={20}>

                { tasks.map( (item, i) =>
                    <TodoItem
                        key={item.id}       /* For re-rendering the children :(((( */
                        id={item.id}
                        index={i}           /* w/ react-sortable-hoc */
                        disabled={onEdit}   /* w/ react-sortable-hoc */
                        task={item.task}
                        done={item.done}
                        onEdit={item.onEdit}
                        validated={false}
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

    function dragDropEnd({oldIndex, newIndex}) {
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        
        setTasks(newTasks);
    };
} // end of function

export default ToDo;