require('dotenv').config()

import morgan from 'morgan';
import { connect } from 'mongoose';
import express from 'express';

const app = express();
import User from './models/users.js';


connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => {
    app.listen(process.env.PORT);
    console.log('connected to db');
})
.catch((err) => console.log(err));


// middleware
app.use(morgan('dev'));
app.use((req, res, next)=> {
    console.log(req.path, req.method);
    next();
});


// mongoose and mongo sandbox routes
app.get('/add-user', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => console.log(err));

});


// routes
app.get('/', (req, res) => {
    res.send('Welcome aboard - ReaderSHIP')
});


