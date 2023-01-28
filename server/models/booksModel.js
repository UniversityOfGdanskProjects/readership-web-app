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
        require: true
    },
    publisher: {
        type: String
    },
    language: {
        type: String,
        require: true
    },
    comments: [
        { 
           type: Schema.Types.ObjectId, 
           ref: 'Comment'
       }
   ],
   rating: {
       'counter' : {type: Number, default: 0},
       'mean': {type: Number, default: 0}
   },
   
    photo_src: String
    
}, { timestamps: true, collection: "books" });

export const Book = model('Book', bookSchema);
