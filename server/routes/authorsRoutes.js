// TODO: authors routes

import express from 'express';
export const router = express.Router();

import { 
    getAuthors,
    getAuthor,
    createAuthor,
    deleteAuthor,
    updateAuthor
} from '../controllers/authorsController.js';

// GET all authors
router.get('/', getAuthors);

// GET a single author
router.get('/:id', getAuthor);

// POST new author
router.post('/', createAuthor);

// DELETE a single author
router.delete('/:id', deleteAuthor);

// UPDATE a single author
router.patch('/:id', updateAuthor);



