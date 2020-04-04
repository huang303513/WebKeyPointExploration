// nextState = reducer(prevState, action);
// action = { type: 'ACTION_TYPE', payload: 'PARAMS_TO_EXECUTE' }

export const initialState = { count: 0 };

const ACTION_INCREMENT = 'INCREMENT';
const ACTION_DECREMENT = 'DECREMENT';

export const increment = () => ({
    type: ACTION_INCREMENT,
});

export const decrement = () => ({
    type: ACTION_DECREMENT,
});

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_INCREMENT:
            return { count: state.count + 1 };
        case ACTION_DECREMENT:
            return { count: state.count - 1 };
        default:
            break;
    }
    return state;
};

export const countSelector = state => state.count;

export const addMutiple = () => ({});

export const loggerMiddleware = dispatch => action => {
    console.log('dispatching action...', action);
    dispatch(action);
};

export const dispatchMiddleware = loggerMiddleware;
