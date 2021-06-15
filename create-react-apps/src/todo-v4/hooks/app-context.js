import { createContext, useReducer, useEffect } from "react";
import AppReducer from './app-reducer';

const CONST_TODOS_LOCAL_STORAGE_NAME = "todos.localStorage";

export const AppContext = createContext();
export const DispatchContext = createContext();

export function AppProvider(props) {
    const cachedData = localStorage.getItem(CONST_TODOS_LOCAL_STORAGE_NAME);
    const initTasks = cachedData ? JSON.parse(cachedData) : [];

    const [app, dispatch] = useReducer(AppReducer, { onEdit: false, onDrag: false, tasks: initTasks } );     

    useEffect( () => {
        localStorage.setItem( CONST_TODOS_LOCAL_STORAGE_NAME, JSON.stringify(app.tasks) );
    }, [app.tasks]);

    return (
        <AppContext.Provider value={app}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </AppContext.Provider>
    ); // return
} // AppProvider