// TODO: fill in comments Schema

import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
import {userSchema} from './usersModel.js'
import {bookSchema} from './booksModel.js'

export const commentSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        // ref: bookSchema,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    body: {
        type: String
    },
    rating: {
        type: Number
    },

    
}, { timestamps: true, collection: "comments" });

export const Comment = model('Comment', commentSchema);
