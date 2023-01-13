// import User from './models/usersModel.js';
import express from 'express';
export const router = express.Router();

// TODO: BACKEND: express routing users

// GET all users
router.get('/', (req, res) => {
    res.json({msg: "GET all users"});
});

// POST new user
router.post('/', (req, res) => {
    res.json({msg: "POST new user"});
    // const user = new User(req.body);
    // user.save()
    //     .then((result) => {
    //         res.send(result);
    //     }).catch((err) => console.log(err));
});


// GET a single user
router.get('/:id', (req, res) => {
    res.json({msg: "GET one user"});
});

// DELETE a single user
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE one user"});
});

// UPDATE a single user
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE one user"});
});


