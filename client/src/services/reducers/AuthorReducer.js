import {
    ADD_AUTHOR,
    DELETE_AUTHOR,
    UPDATE_AUTHOR,
    GET_ALL_AUTHORS,
    GET_AUTHOR
  } from '../actions/AuthorActions';

const initialState = []

export const AuthorReducer = (state=initialState, action) => {
    console.log('ACTION: ', action.type);
    switch (action.type) {
        case ADD_AUTHOR:
            return [...state, action.payload]
        case DELETE_AUTHOR:
            return [...state.filter(el => el._id != action.payload._id)]
        case UPDATE_AUTHOR:
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_AUTHORS:
            console.log("GETALLBOOKS - BookReducer: ", action.payload)
            return [...action.payload]

        case GET_AUTHOR:
            return [...state.filter(el => el._id == action.payload._id)]
           
        default:
            return state
    }
};