// TODO: comments Routes

import express from 'express';
export const router = express.Router();

// GET all comments
router.get('/', (req, res) => {
    res.json({msg: "GET all comments"});
});

// POST new comment
router.post('/', (req, res) => {
    res.json({msg: "POST new comment"});
});

// GET a single comment
router.get('/:id', (req, res) => {
    res.json({msg: "GET one comment"});
});

// DELETE a single comment
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE one comment"});
});

// UPDATE a single comment
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE one comment"});
});
