import { combineReducers } from "@reduxjs/toolkit";
import { createStore } from 'redux';
import { UserReducer } from "../reducers/UserReducer";
import { AuthorReducer } from "../reducers/AuthorReducer";
import { BookReducer } from "../reducers/BookReducer";
import { CommentReducer } from "../reducers/CommentReducer";
import { ShelfReducer } from "../reducers/ShelfReducer";


const reducer = combineReducers({
    books: BookReducer,
    authors: AuthorReducer,
    comments: CommentReducer,
    shelfs: ShelfReducer,
    users: UserReducer,
});

const store = createStore(reducer);

export default store;
