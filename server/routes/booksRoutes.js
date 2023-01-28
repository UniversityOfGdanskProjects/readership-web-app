// TODO: BACKEND: express routing for books

import express from 'express';
export const router = express.Router();

import { 
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook,
    searchBooks
} from '../controllers/booksController.js';

// GET all 
router.get('/', getBooks);

// GET one
router.get('/:id', getBook);

// POST new one
router.post('/', createBook);

// DELETE one
router.delete('/:id', deleteBook);

// UPDATE one
router.patch('/:id', updateBook);

// SEARCH many 
router.get('/search/:search', searchBooks);

