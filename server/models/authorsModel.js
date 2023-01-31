import { model, Schema } from 'mongoose';

import { Book } from './booksModel.js'

export const authorSchema = new Schema({
    fullName: {
        type: String,
        required: true
    }, 
    
    photo: String,
    
}, { timestamps: true });

export const Author = model('Author', authorSchema);