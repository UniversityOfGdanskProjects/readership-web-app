import mongoose from 'mongoose';
import { User } from '../models/usersModel.js';

// GET all
export const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
};


// GET one
export const getUser= async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found- no ObjectId'});
    };

    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    };
    res.status(200).json(user);
};


// POST one
export const createUser = async (req, res) => {

    // add to the database
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    };
  };


// DELETE one
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found- no ObjectId'});
    };

    const user = await User.findOneAndDelete({_id: id});
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    };
    res.status(200).json(user);
}

// UPDATE one
export const updateUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found- no ObjectId'});
    };

    const user = await User.findOneAndUpdate({_id: id}, {...req.body});
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    };
    res.status(200).json(user);
};