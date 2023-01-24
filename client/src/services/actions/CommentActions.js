export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export const GET_ALL_COMMENT = 'GET_ALL_COMMENTS';


export const addCommentAction = (payload) => ({
    type: ADD_COMMENT,
    payload
});

export const deleteCommentAction = (payload) => ({
    type: DELETE_COMMENT,
    payload
});

export const updateCommentAction = (payload) => ({
    type: UPDATE_COMMENT,
    payload
});

export const getAllCommentsAction = (payload) => ({
    type: GET_ALL_COMMENT,
    payload
});
export const getCommentAction = (payload) => ({
    type: GET_COMMENT,
    payload
});