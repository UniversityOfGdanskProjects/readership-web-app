import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
import {bookSchema} from './booksModel.js'
import {commentSchema} from './commentsModel.js'

export const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lsatName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: Date,
    },
    termsAndConditions: {
        type: Boolean,
        require: true,
    },
    accountType: {
        type: String, // user
    },
    shelfs: [ // empty or [want to read, currently reading, read, ..to create by user]
        {
            shelfTitle: {type: String, require: true},
            booksOnShelf: [{
                book: { 
                    type: Schema.Types.ObjectId, 
                    // ref: bookSchema 
                }
            }]
        }
    ],
    commentsAndRatings: [
        {commentId: { 
            type: Schema.Types.ObjectId, 
            // ref: commentSchema 
        }}
    ]

    
}, { timestamps: true });

export const User = model('User', userSchema);



