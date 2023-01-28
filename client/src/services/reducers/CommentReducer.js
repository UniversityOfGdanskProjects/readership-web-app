import {
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    GET_ALL_COMMENT
  } from '../actions/CommentActions';

const initialState = []

export const CommentReducer = (state=initialState, action) => {

    switch (action.type) {
        case ADD_COMMENT:
            console.log('ACTION: ', action.type);
            return [...state, action.payload]
        case DELETE_COMMENT:
            console.log('ACTION: ', action.type);
            return [...state.filter(el => el._id !== action.payload._id)]
        case UPDATE_COMMENT:
            console.log('ACTION: ', action.type);
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_COMMENT:
            console.log('ACTION: ', action.type);
            return [...action.payload]

        default:
            return state
    }
};