import { model, Schema } from 'mongoose';

import { Book } from './booksModel.js'

export const authorSchema = new Schema({
    fullName: {
        type: String,
        require: true
    }, 
    books: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Book' 
        }
    ],
    photo: String,
    
}, { timestamps: true });

export const Author = model('Author', authorSchema);