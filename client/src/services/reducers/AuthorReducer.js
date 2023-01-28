import {
    ADD_AUTHOR,
    DELETE_AUTHOR,
    UPDATE_AUTHOR,
    GET_ALL_AUTHORS
  } from '../actions/AuthorActions';

const initialState = []

export const AuthorReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case ADD_AUTHOR:
            console.log('ACTION: ', action.type);
            return [...state, action.payload]
        case DELETE_AUTHOR:
            console.log('ACTION: ', action.type);
            return [...state.filter(el => el._id !== action.payload._id)]
        case UPDATE_AUTHOR:
            console.log('ACTION: ', action.type);
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_AUTHORS:
            console.log('ACTION: ', action.type)
            return [...action.payload]
           
        default:
            return state
    }
};