import {
    ADD_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK,
    GET_ALL_BOOKS,
    GET_BOOK
  } from '../actions/BookActions';

const initialState = []

export const BookReducer = (state=initialState, action) => {
    console.log('ACTION: ', action.type);
    switch (action.type) {
        case ADD_BOOK:
            return [...state, action.payload]
        case DELETE_BOOK:
            return [...state.filter(el => el._id != action.payload._id)]
        case UPDATE_BOOK:
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_BOOKS:
            console.log("GETALLBOOKS - BookReducer: ", action.payload)
            return [...action.payload]

        case GET_BOOK:
            return [...state.filter(el => el._id == action.payload._id)]

        default:
            return state
    }
};