import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { loggerMiddleware } from './v1';

export const initialState = { count: 0 };

export const { increment, decrement } = createActions({}, 'INCREMENT', 'DECREMENT');

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

const stateSelector = state => state;

// a -> b -> c
//
// const toUIListItem = (item) => {
//     return {
//          id: item.id,
//          price: formatMoney(item.finalPrice),
//          discount: item.finalPrice / item.price,
//     };
// };
// const list = state.category.items.map(toUIListItem);
export const countSelector = createSelector(stateSelector, state => state.count);

export const addMutiple = () => ({});

export const dispatchMiddleware = loggerMiddleware;
