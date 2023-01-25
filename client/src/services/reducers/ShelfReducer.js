import {
    ADD_SHELF,
    DELETE_SHELF,
    UPDATE_SHELF,
    GET_ALL_SHELF
  } from '../actions/ShelfActions';

const initialState = {}

export const ShelfReducer = (state=initialState, action) => {
    console.log('ACTION: ', action.type);
    switch (action.type) {
        case ADD_SHELF:
            return {...state, ...action.payload}
        case DELETE_SHELF:
            // payload = "strign name" 
            delete state[action.payload]
            return state
        case UPDATE_SHELF:
            // payload {
            //     name: [books]
            // }
            return {...state, ...action.payload};
        case GET_ALL_SHELF:
            console.log("GETALLSHELFS - ShelfReducer: ", action.payload)
            return {...action.payload}

        default:
            return state
    }
};