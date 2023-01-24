import {
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    GET_COMMENT,
    GET_ALL_COMMENT
  } from '../actions/CommentActions';

const initialState = []

export const CommentReducer = (state=initialState, action) => {
    console.log('ACTION: ', action.type);
    switch (action.type) {
        case ADD_COMMENT:
            return [...state, action.payload]
        case DELETE_COMMENT:
            return [...state.filter(el => el._id != action.payload._id)]
        case UPDATE_COMMENT:
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_COMMENT:
            console.log("GETALLBOOKS - BookReducer: ", action.payload)
            return [...action.payload]

        case GET_COMMENT:
            return [...state.filter(el => el._id == action.payload._id)]

        default:
            return state
    }
};