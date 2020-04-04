import { createActions, handleActions } from 'redux-actions';
import { loggerMiddleware } from './v1';

export const initialState = { count: 0 };

export const { increment, decrement } = createActions({}, 'INCREMENT', 'DECREMENT', {
    prefix: '<prefix>',
});

export const reducer = handleActions(
    {
        [increment]: (state, action) => {
            return { count: state.count + 1 };
        },
        [decrement]: (state, action) => {
            return { count: state.count - 1 };
        },
    },
    initialState,
);

export const countSelector = state => state.count;

export const thunkMiddleware = dispatch => {
    const dispatchPlus = action => {
        // use a functional action to dispatch multiple changes
        if (typeof action === 'function') {
            action(dispatchPlus);
            return;
        }

        dispatch(action);
    };
    return dispatchPlus;
};

export const dispatchMiddleware = dispatch => {
    const dispatchWithLog = loggerMiddleware(dispatch);
    const dispatchWithThunkSupported = action => {
        // use a functional action to dispatch multiple changes
        if (typeof action === 'function') {
            action(dispatchWithThunkSupported);
            return;
        }

        dispatchWithLog(action);
    };
    return dispatchWithThunkSupported;
};

export const addMutiple = times => dispatch => {
    dispatch(increment());
    const timesLeft = times - 1;
    if (timesLeft > 0) {
        setTimeout(() => {
            dispatch(addMutiple(timesLeft));
        }, 1000);
    }
};
