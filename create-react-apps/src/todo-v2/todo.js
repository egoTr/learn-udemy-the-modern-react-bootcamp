import React, { useState, useEffect, useRef } from 'react';
import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import './todo.css';
import TodoForm from './todo-form';
import TodoItem from './todo-item';

const CONST_TODOS_LOCAL_STORAGE_NAME = "todos.localStorage";

document.title = "React Challenge/> Todo - v2";

function ToDo(props) {
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

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

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}>

                     <SortableContext 
                        items={null}
                        strategy={verticalListSortingStrategy}
                    >

                    <div>
                        { tasks.map( (item, i) =>
                            <TodoItem
                                key={i}
                                id={i}
                                task={item.task}
                                /*done={item.done}
                                onEdit={item.onEdit}
                                ref={item.onEdit ? refTodoItem : null}
                                validated={false}
                                toogleBehavior={toogleTaskDone}
                                removeBehavior={removeTaskById}
                                editBehavior={editTaskById}
                                editCancelBehavior={editCancelTaskById}
                                updateBehavior={updateTaskById}*/
                            />
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </todo>
    ) // return

    function handleDragStart(event) { console.log('handleDragStart');
        const {active} = event;
        
        setActiveId(active.id);
      } // handleDragStart
      
      function handleDragEnd(event) { console.log('xxx');
        const {active, over} = event;
        
        if (active.id !== over.id) {
          setTasks((items) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            
            return arrayMove(items, oldIndex, newIndex);
          });
        }
        
        setActiveId(null);
      } // handleDragEnd
} // end of function

export default ToDo;