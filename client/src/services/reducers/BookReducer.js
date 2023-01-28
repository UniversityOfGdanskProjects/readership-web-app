import {
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK,
    GET_ALL_BOOKS
  } from '../actions/BookActions';

const initialState = []

export const BookReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case ADD_BOOK:
            console.log('ACTION: ', action.type);
            return [...state, action.payload]
        case DELETE_BOOK:
            console.log('ACTION: ', action.type);
            return [...state.filter(el => el._id !== action.payload._id)]
        case UPDATE_BOOK:
            console.log('ACTION: ', action.type);
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_BOOKS:
            console.log('ACTION: ', action.type);
            return [...action.payload]

        default:
            return state
    }
};