import mongoose from 'mongoose';
import { Author } from '../models/authorsModel.js';

// GET all authors
export const getAuthors = async (req, res) => {
    const authors = await Author.find({}).sort({createdAt: -1});
    res.status(200).json(authors);
};


// GET a single author
export const getAuthor = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Author not found- no ObjectId'});
    };

    const author = await Author.findById(id);
    if(!author) {
        return res.status(404).json({error: 'Author not found'});
    };
    res.status(200).json(author);
};


// POST new author
export const createAuthor = async (req, res) => {
    // const { ... } = req.body
    // add to the database
    try {
      const author = await Author.create(req.body);
      res.status(200).json(author);
    } catch (error) {
      res.status(400).json({ error: error.message });
    };
  };


// DELETE a single author
export const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Author not found- no ObjectId'});
    };

    const author = await Author.findOneAndDelete({_id: id});
    if(!author) {
        return res.status(404).json({error: 'Author not found'});
    };
    res.status(200).json(author);
}

// UPDATE a single author
export const updateAuthor = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Author not found- no ObjectId'});
    };

    const author = await Author.findOneAndUpdate({_id: id}, {...req.body});
    if(!author) {
        return res.status(404).json({error: 'Author not found'});
    };
    res.status(200).json(author);
};