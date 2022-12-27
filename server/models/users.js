import mongoose, { model } from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
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
        require: true,
    },
    // accountType: 'user',
    terms: {
        type: Boolean,
        require: true,
    }
}, { timestamps: true });

const User = model('User', userSchema);

export default  User;

