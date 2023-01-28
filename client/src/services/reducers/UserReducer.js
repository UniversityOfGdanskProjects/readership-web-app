import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    GET_ALL_USERS
  } from '../actions/UserActions';

const initialState = []

export const UserReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            console.log('ACTION: ', action.type);
            return [...state, action.payload]
        case DELETE_USER:
            console.log('ACTION: ', action.type);
            // payload: userID
            return [...state.filter(user=> {
                return user._id !== action.payload
            })]
        case UPDATE_USER:
            console.log('ACTION: ', action.type);
            // admin can delete comments
            // TODO: create option to update user
            // payload: { newUserData } // not allUserData   
            
            return [...state.map( user => {
                if (user._id === action.payload) {
                    return {...user, ...action.payload}
                }
                return user
            })]
         case GET_ALL_USERS:
            console.log('ACTION: ', action.type);
            return [...action.payload]
           
        default:
            return state
    }
};