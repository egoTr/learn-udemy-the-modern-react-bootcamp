import arrayMove from 'array-move';

const reducer = (state, action) => {
    let newTask, newTasks;

    switch (action.type) {
        case 'ADD':
            newTask = {task: action.task, id: Date.now(), done: false, onEdit: false};
            return ({ ...state, tasks: [...state.tasks, newTask] });
        
        case 'TOGGLE':
            if (state.onEdit)
                return state;
            newTasks = state.tasks.map( task => (
                task.id === action.id ? {...task, done: !task.done} : task
            ));
            return ({ ...state, tasks: newTasks });

        case 'EDIT_START':
            if (state.onEdit)
                return state;
            newTasks = state.tasks.map( task => (
                task.id === action.id ? {...task, onEdit: true} : task
            ));
            return ({ ...state, onEdit: true, tasks: newTasks });    

        case 'EDIT_CANCEL':
            newTasks = state.tasks.map( task => (
                task.id === action.id ? {...task, onEdit: false} : task
            ));
            return ({ ...state, onEdit: false, tasks: newTasks });
        
        case 'EDIT_SUBMIT':
            newTasks = state.tasks.map( task => (
                task.id === action.id ? {...task, task: action.task, onEdit: false} : task
            ));
            return ({ ...state, onEdit: false, tasks: newTasks });

        case 'REMOVE':
            if (state.onEdit)
                return state;
            return ({ ...state, tasks: state.tasks.filter(task => task.id !== action.id) });

        case 'DRAG_START':
            // prevent continuously re-rendering
            if (state.onDrag)
                return state;
            
            return ({ ...state, onDrag: true });

        case 'DRAG_END':
            if (action.oldIndex === action.newIndex)
                return state;

            newTasks = arrayMove(state.tasks, action.oldIndex, action.newIndex);
            return ({ ...state, onDrag: false, tasks: newTasks });

        default:
            return state;
    } // switch
} // reducer

export default reducer;