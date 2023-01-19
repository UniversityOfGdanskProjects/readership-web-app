import mongoose from 'mongoose';
import { Book } from '../models/booksModel.js';

// GET all
export const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1});
    res.status(200).json(books);
};


// GET one
export const getBook= async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Book not found- no ObjectId'});
    };

    const book = await Book.findById(id);
    if(!book) {
        return res.status(404).json({error: 'Book not found'});
    };
    res.status(200).json(book);
};


// POST one
export const createBook = async (req, res) => {

    // add to the database
    try {
      const book = await Book.create(req.body);
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    };
  };


// DELETE one
export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Book not found- no ObjectId'});
    };

    const book = await Book.findOneAndDelete({_id: id});
    if(!book) {
        return res.status(404).json({error: 'Book not found'});
    };
    res.status(200).json(book);
}

// UPDATE one
export const updateBook = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Book not found- no ObjectId'});
    };

    const book = await Book.findOneAndUpdate({_id: id}, {...req.body});
    if(!book) {
        return res.status(404).json({error: 'Book not found'});
    };
    res.status(200).json(book);
};