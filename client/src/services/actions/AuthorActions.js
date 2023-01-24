export const ADD_AUTHOR = 'ADD_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR';
export const GET_AUTHOR = 'GET_AUTHOR';
export const GET_ALL_AUTHORS = 'GET_ALL_AUTHORS'; // do wyszukiwarki


export const addAuthorAction = (payload) => ({
    type: ADD_AUTHOR,
    payload
});

export const deleteAuthorAction = (payload) => ({
    type: DELETE_AUTHOR,
    payload
});

export const updateAuthorAction = (payload) => ({
    type: UPDATE_AUTHOR,
    payload
});

export const getAllAuthorsAction = (payload) => ({
    type: GET_ALL_AUTHORS,
    payload
});

export const getAuthorAction = (payload) => ({
    type: GET_AUTHOR,
    payload
});