import { createContext } from "react";
import useAppState from '../hooks/useAppState';

export const AppContext = createContext();
export function AppProvider(props) {
    const appStates = useAppState();

    return (
        <AppContext.Provider
            value={appStates}
        >
            {props.children}
        </AppContext.Provider>
    ); // return
} // AppProvider