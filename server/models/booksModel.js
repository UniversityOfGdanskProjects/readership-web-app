import mongoose, { model } from 'mongoose';
import {authorSchema} from './authorsModel.js'
import {commentSchema} from './commentsModel.js'
const { Schema } = mongoose;

export const bookSchema = new Schema({
    title: {
        type: String,
        require: true
    }, 
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: authorSchema
    }],
    shortDescription: {
        type: String
    },
    longDescription: {
        type: String
    },
    genres: [
        {type: String}

    ],
    pages: {
        type: Number
    },
    publicationDate: {
        type: Date,
        require: true
    },
    publisher: {
        type: String
    },
    language: {
        type: String,
        require: true
    },
    commentsAndRatings: [
        { 
            type: Schema.Types.ObjectId, 
            // ref: commentSchema
        }
    ],
    isbn10: {
        type: String
    },
    isbn13: {
        type: String
    }
    
}, { timestamps: true });

export const Book = model('Book', bookSchema);
