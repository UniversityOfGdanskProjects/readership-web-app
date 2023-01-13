// TODO: publisher routes

import express from 'express';
export const router = express.Router();

// GET all publishers
router.get('/', (req, res) => {
    res.json({msg: "GET all publishers"});
});

// POST new publisher
router.post('/', (req, res) => {
    res.json({msg: "POST new publisher"});
});

// GET a single publisher
router.get('/:id', (req, res) => {
    res.json({msg: "GET one publisher"});
});

// DELETE a single publisher
router.delete('/:id', (req, res) => {
    res.json({msg: "DELETE one publisher"});
});

// UPDATE a single publisher
router.patch('/:id', (req, res) => {
    res.json({msg: "UPDATE one publisher"});
});
