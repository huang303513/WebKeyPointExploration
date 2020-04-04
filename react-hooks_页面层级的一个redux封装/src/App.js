import React, { createContext, useReducer, useContext, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';

// import {
//     increment,
//     decrement,
//     reducer,
//     initialState,
//     addMutiple,
//     countSelector,
//     dispatchMiddleware,
// } from './v1';


import {
    increment,
    decrement,
    reducer,
    initialState,
    addMutiple,
    countSelector,
    dispatchMiddleware,
} from './v2';

// //*
// import {
//     increment,
//     decrement,
//     reducer,
//     initialState,
//     addMutiple,
//     countSelector,
//     dispatchMiddleware,
// } from './v3';
// //*/

const ScreenContext = createContext();

const ScreenContextProvider = ({ reducer, initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const context = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch],
    );
    return <ScreenContext.Provider value={context}>{children}</ScreenContext.Provider>;
};

const useScreenContext = () => useContext(ScreenContext);

const useScreenDispatch = () => {
    const { dispatch } = useScreenContext();
    return useMemo(() => dispatchMiddleware(dispatch), [dispatch]);
};

const useCount = () => {
    const { state } = useScreenContext();
    return countSelector(state);
};

const Counter = () => {
    const dispatch = useScreenDispatch();
    return (
        <>
            Count: {useCount()}
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addMutiple(5))}>+5</button>
        </>
    );
};

function App() {
    return (
        <ScreenContextProvider reducer={reducer} initialState={initialState}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Counter />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </ScreenContextProvider>
    );
}

export default App;
