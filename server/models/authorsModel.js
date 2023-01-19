import mongoose, { model } from 'mongoose';
const Schema = mongoose.Schema
import { bookSchema } from './booksModel.js'

export const authorSchema = new Schema({
    fullName: {
        type: String,
        require: true
    }, 
    books: [
        { type: Schema.Types.ObjectId, ref: bookSchema }
    ],
    photo: String,
    
}, { timestamps: true });

export const Author = model('Author', authorSchema);