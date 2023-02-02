import { model, Schema } from 'mongoose';
import { Book } from './booksModel.js'
import {Comment} from './commentsModel.js'

export const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        dropDups: true 
        // required: true,
    },
        
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        dropDups: true 
        
    },
    dateOfBirth: {
        type: Date,
    },
    terms: {
        type: Boolean,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    shelfs: { // empty or [want to read, currently reading, read, ..to create by user]
        type: Object,
        default: {shelfs: {"read":[], "want to read": []}} 
        
        // { type: Schema.Types.ObjectId, 
        // ref: 'Book'}
    }
    
}, { timestamps: true, collection: "users", minimize:false});

export const User = model('User', userSchema);



