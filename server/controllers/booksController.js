import mongoose from 'mongoose';
import { Book } from '../models/booksModel.js';
import log from 'log-to-file';

// GET all
export const getBooks = async (req, res) => {
    const books = await Book.find({}).sort({createdAt: -1});
    return res.status(200).json(books);
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
    return res.status(200).json(book);
};

// SEARCH one
export const searchBooks= async (req, res) => {
    console.log("Searching book")
    const { search } = req.params;
    if(/^[A-Za-z0-9]/.test(search)) {
        const books = await Book.find({title: {$regex : search}});
        return res.status(200).json(books);
    };
    return res.status(200).json({});
};


// POST one
export const createBook = async (req, res) => {

    // add to the database
    try {
      const book = await Book.create(req.body);
      log("BOOK CREATED");
      return res.status(200).json(book);
    } catch (error) {
        log("BOOK NOT CREATED");
      return res.status(400).json({ error: error.message });
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
    return res.status(200).json(book);
}

// UPDATE one
export const updateBook = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);

    console.log("UPDATING A BOOK...")
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Book not found- no ObjectId');
        return res.status(404).json({error: 'Book not found- no ObjectId'});
    };
    
    const book = await Book.findOneAndUpdate({_id: id}, {...req.body});
    if(!book) {
        console.log("BOOK NOT FOUNDED");
        log("BOOK NOT FOUNDED");
        return res.status(404).json({error: 'Book not found'});
    };
    const updatedBook = await Book.findOne({_id: id});
    log("BOOK FOUNDED");
    console.log("BOOK FOUNDED", updatedBook);
    
    return res.status(200).json(updatedBook);
};

// amout of read / want to read

export const getUsersAmount = async (req, res) => {

    const usersAmount = await Users.aggregate([ 
    {$group: {_id: null, userAmount : {$count : {}}}}
]);
    if(!usersAmount) {
        return res.status(404).json({error: 'Could not '});
    };
    res.status(200).json(usersAmount);

}