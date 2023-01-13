// TODO: BACKEND: express routing for books

import express from 'express';
export const router = express.Router();

// GET all books
router.get('/', (req, res) => {
    res.json({msg: "GET all books"});
});

// POST new book
router.post('/', (req, res) => {
    res.json({msg: "POST new book"});
});


// GET a single book
router.get('/:id', (req, res) => {
    res.json({msg: "GET one book"});
});

// DELETE a single book
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE one book"});
});

// UPDATE a single book
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE one book"});
});

