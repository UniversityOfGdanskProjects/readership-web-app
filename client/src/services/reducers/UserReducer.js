
import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    GET_ALL_USERS,
    GET_USER
  } from '../actions/UserActions';

const initialState = []

// useEffect(() => {
//     initialState = 
// }, []);

export const UserReducer = (state=initialState, action) => {
    console.log('ACTION: ', action.type);
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload]
        case DELETE_USER:
            // TODO: create option to delete user
            return state
        case UPDATE_USER:
            // TODO: create option to update user
            return state
        case GET_ALL_USERS:
            console.log("GETALLUSERS - userReducer: ", action.payload)
            return [...action.payload]

        case GET_USER:
           
        default:
            return state
    }
};