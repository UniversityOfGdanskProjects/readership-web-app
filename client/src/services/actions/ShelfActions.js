export const ADD_SHELF = 'ADD_SHELF';
export const DELETE_SHELF = 'DELETE_SHELF';
export const UPDATE_SHELF = 'UPDATE_SHELF';
export const GET_SHELF = 'GET_SHELF';
export const GET_ALL_SHELF = 'GET_ALL_SHELF';


export const addShelfAction = (payload) => ({
    type: ADD_SHELF,
    payload
});

export const deleteShelfAction = (payload) => ({
    type: DELETE_SHELF,
    payload
});

export const updateShelfAction = (payload) => ({
    type: UPDATE_SHELF,
    payload
});

export const getAllShelfsAction = (payload) => ({
    type: GET_ALL_SHELF,
    payload
});
export const getShelfAction = (payload) => ({
    type: GET_SHELF,
    payload
});