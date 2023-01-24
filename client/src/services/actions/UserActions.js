export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_USER = 'GET_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export const addUserAction = (payload) => ({
    type: ADD_USER,
    payload
});

export const deleteUserAction = (payload) => ({
    type: DELETE_USER,
    payload
});

export const updateUserAction = (payload) => ({
    type: UPDATE_USER,
    payload
});

export const getUserAction = (payload) => ({
    type: GET_USER,
    payload
});
export const getAllUsersAction = (payload) => ({
    type: GET_ALL_USERS,
    payload
});

// Async Actions

// async function getUsersActions() {
//     try {
//         const response = await axios.get('/all-users')
//     }
// }