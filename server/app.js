import morgan from 'morgan';
import { connect } from 'mongoose';
import express from 'express';
import { config } from './config.js';
const {appSettings ,db}= config;
const app = express();
import User from './models/users.js';
// console.log(db.uri);

connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => {
    app.listen(appSettings.port);
    console.log('connected to db');
})
.catch((err) => console.log(err));


console.log(appSettings.name);
app.use(morgan('dev'));


// mongoose and mongo sandbox routes
app.get('/add-user', (req, res) => {
    const user = new User({
        username: 'morganus',
        firstName: 'Morgan',
        lastName: 'Freeman',
        email: 'morgan@free.com',
        dateOfBirth: '2020/02/01',
        terms: true
    });
    user.save()
        .then((result) => {
            res.send(result);
        }).catch((err) => console.log(err));

});


// routes
app.get('/api', (req, res) => {
    res.send('Welcome aboard - ReaderSHIP')
});


