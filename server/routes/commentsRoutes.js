// TODO: comments Routes

import express from 'express';
export const router = express.Router();

import { 
    getComments,
    getComment,
    createComment,
    deleteComment,
    updateComment
} from '../controllers/commentsController.js';

// GET all 
router.get('/', getComments);

// GET one
router.get('/:id', getComment);

// POST new one
router.post('/', createComment);

// DELETE one
router.delete('/:id', deleteComment);

// UPDATE one
router.patch('/:id', updateComment);
