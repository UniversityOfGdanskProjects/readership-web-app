import mongoose, { model } from 'mongoose';
import {authorSchema} from './authorsModel.js'
import {commentSchema} from './commentsModel.js'
const { Schema } = mongoose;

export const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }],
    description: {
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
        required: true
    },
    publisher: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
    comments: [
        { 
           type: Schema.Types.ObjectId, 
           ref: 'Comment'
       }
   ],

   stats: {
        type: Object
   },
   
    photo_src: String
    
}, { timestamps: true, collection: "books" });

export const Book = model('Book', bookSchema);
