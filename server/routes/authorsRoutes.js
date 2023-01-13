// TODO: authors routes

import express from 'express';
export const router = express.Router();

// GET all authors
router.get('/', (req, res) => {
    res.json({msg: "GET all authors"});
});

// POST new author
router.post('/', (req, res) => {
    res.json({msg: "POST new author"});
});


// GET a single author
router.get('/:id', (req, res) => {
    res.json({msg: "GET one author"});
});

// DELETE a single author
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE one author"});
});

// UPDATE a single author
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE one author"});
});



