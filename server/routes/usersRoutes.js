import express from 'express';
export const router = express.Router();

import { 
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    postLoginUser,
    getUsersAmount,
    updateMoveRead
} from '../controllers/usersController.js';

// GET all 
router.get('/', getUsers);

// POST 
router.post('/login', postLoginUser);

// amount of users
router.get('/amount', getUsersAmount);

// GET one
router.get('/:id', getUser);

// POST new one
router.post('/', createUser);

// DELETE one
router.delete('/:id', deleteUser);

// UPDATE one
router.patch('/:id', updateUser);

// move - read
router.patch('/move-read/:id', updateMoveRead);
