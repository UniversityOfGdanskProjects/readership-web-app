import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../reducers/UserReducer";
import { AuthorReducer } from "../reducers/AuthorReducer";
import { BookReducer } from "../reducers/BookReducer";
import { CommentReducer } from "../reducers/CommentReducer";
import { ShelfReducer } from "../reducers/ShelfReducer";


export const reducers = combineReducers({
    books: BookReducer,
    authors: AuthorReducer,
    comments: CommentReducer,
    shelfs: ShelfReducer,
    users: UserReducer,
});

export const store = configureStore({reducer: reducers});

// export default store;
