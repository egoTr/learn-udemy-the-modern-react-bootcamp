import React from 'react';
import { AppProvider } from './hooks/app-context';

import './todo.css';
import TodoForm from './todo-form';
import TodoListSortable from './todo-list';

document.title = "React Challenge/> Todo - v4 w/ useReducer";

function ToDo() {
    return (
        <AppProvider>
            <todo is="react">
                <h1>TODOs</h1>

                <TodoForm/>

                <hr/>
                
                <TodoListSortable/>
            </todo>
        </AppProvider>
    ) // return    
} // end of function

export default ToDo;