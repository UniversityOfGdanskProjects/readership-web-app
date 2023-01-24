import {
    ADD_SHELF,
    DELETE_SHELF,
    UPDATE_SHELF,
    GET_SHELF,
    GET_ALL_SHELF
  } from '../actions/ShelfActions';

const initialState = []

export const ShelfReducer = (state=initialState, action) => {
    console.log('ACTION: ', action.type);
    switch (action.type) {
        case ADD_SHELF:
            return [...state, action.payload]
        case DELETE_SHELF:
            // TODO: Can't delete read, 
            return [...state.filter(shelf => {
                if (action.payload.read != undefined ) {
                    return true
                } else {
                    // poprawić shelfs: [[title, [books..]], ]
                    return shelf.name != action.payload.name
                }
            })]
        case UPDATE_SHELF:
            // TODO: create option to update
            const newState = [...state.map(el => {
                if (el._id === action.payload._id) {
                    return action.payload
                } else return el
            })]
            return newState
        case GET_ALL_SHELF:
            console.log("GETALLBOOKS - BookReducer: ", action.payload)
            return [...action.payload]

        case GET_SHELF:
            return [...state.filter(el => el._id == action.payload._id)]

        default:
            return state
    }
};