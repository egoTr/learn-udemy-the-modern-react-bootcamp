import { useState } from 'react';
import arrayMove from 'array-move';

const AppState = (initial) => {
    const [app, setApp] = useState(initial);

    function addTodo(task) {
        const newTask = {task, id: Date.now(), done: false, onEdit: false};

        setApp({ ...app, tasks: [...app.tasks, newTask] });
    } // end of method

    function toogleTaskDone(taskId) {
        if (app.onEdit)
            return;
        
        const newTasks = app.tasks.map( task => (
            task.id === taskId ? {...task, done: !task.done} : task
        ));

        setApp({ ...app, tasks: newTasks });
    } // removeTaskById

    function removeTaskById(taskId)  {
        if (app.onEdit)
            return;

        setApp({ ...app, tasks: app.tasks.filter(task => task.id !== taskId) });
    } // removeTaskById

    function editTaskById(taskId) {
        if (app.onEdit)
            return;
        
        const newTasks = app.tasks.map( task => (
            task.id === taskId ? {...task, onEdit: true} : task
        ));

        setApp({ ...app, onEdit: true, tasks: newTasks });
    } // editTaskById

    function editCancelTaskById(taskId)  {
        const newTasks = app.tasks.map( task => (
            task.id === taskId ? {...task, onEdit: false} : task
        ));

        setApp({ ...app, onEdit: false, tasks: newTasks });
    } // editCancelTaskById

    function updateTaskById(taskId, taskText) {
        const newTasks = app.tasks.map( task => (
            task.id === taskId ? {...task, task: taskText, onEdit: false} : task
        ));

        setApp({ ...app, onEdit: false, tasks: newTasks });
    } // updateTaskById

    function dragDropStart() {        
        setApp({ ...app, onDrag: true });
    };

    function dragDropEnd({oldIndex, newIndex}) {
        const newTasks = arrayMove(app.tasks, oldIndex, newIndex);
        
        setApp({ ...app, onDrag: false, tasks: newTasks });
    };

    return [app, addTodo, toogleTaskDone, removeTaskById, editTaskById, editCancelTaskById, updateTaskById, dragDropStart, dragDropEnd];
} // TodoHook

export default AppState;