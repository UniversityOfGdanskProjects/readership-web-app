export const ADD_BOOK = 'ADD_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';


export const addBookAction = (payload) => ({
    type: ADD_BOOK,
    payload
});

export const deleteBookAction = (payload) => ({
    type: DELETE_BOOK,
    payload
});

export const updateBookAction = (payload) => ({
    type: UPDATE_BOOK,
    payload
});

export const getAllBooksAction = (payload) => ({
    type: GET_ALL_BOOKS,
    payload
});
