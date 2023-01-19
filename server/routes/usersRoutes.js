import express from 'express';
export const router = express.Router();

import { 
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} from '../controllers/usersController.js';

// GET all 
router.get('/', getUsers);

// GET one
router.get('/:id', getUser);

// POST new one
router.post('/', createUser);

// DELETE one
router.delete('/:id', deleteUser);

// UPDATE one
router.patch('/:id', updateUser);

