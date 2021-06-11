import React, { useState, useEffect, useRef } from 'react';

import './todo.css';
import TodoForm from './todo-form';
import TodoItem from './todo-item';

const CONST_TODOS_LOCAL_STORAGE_NAME = "todos.localStorage";

document.title = "React Challenge/> Todo - v2";

function ToDo(props) {
    const [initialized, setInit] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [tasks, setTasks] = useState([]);

    const refForm = useRef();
    const refTodoItem = useRef();

    useEffect( () => {
        if ( !initialized && localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME) ) {
            const tasks = JSON.parse( localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME) );

            setInit(true);
            setTasks(tasks);
        } // if
    }, [initialized]);

    useEffect( () => {
        if (initialized)
            localStorage.setItem( CONST_TODOS_LOCAL_STORAGE_NAME, JSON.stringify(tasks) );
    }, [initialized, tasks]);

    useEffect( () => {
        if (onEdit)
            refTodoItem.current.focus();
        else
            refForm.current.focus();
    }, [tasks, onEdit]);

    function addTodo(task) {
        const newTask = {task, id: Date.now(), done: false, onEdit: false};

        setTasks([...tasks, newTask]);
    } // end of method

    function toogleTaskDone(taskId) {
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
            <TodoForm ref={refForm} submitBehavior={addTodo}/>

            <hr/>
            
            { tasks.length === 0 && <p>No tasks.</p>}

            { tasks.map( (item, i) =>
                <TodoItem
                    key={i}
                    id={item.id}
                    task={item.task}
                    done={item.done}
                    onEdit={item.onEdit}
                    ref={item.onEdit ? refTodoItem : null}
                    validated={false}
                    toogleBehavior={toogleTaskDone}
                    removeBehavior={removeTaskById}
                    editBehavior={editTaskById}
                    editCancelBehavior={editCancelTaskById}
                    updateBehavior={updateTaskById}
                />
            )}
        </todo>
    ) // return
} // end of function

export default ToDo;