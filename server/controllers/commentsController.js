import mongoose from 'mongoose';
import { Comment } from '../models/commentsModel.js';

// GET all
export const getComments = async (req, res) => {
    const comments = await Comment.find({}).sort({createdAt: -1});
    res.status(200).json(comments);
};


// GET one
export const getComment= async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Comment not found- no ObjectId'});
    };

    const comment = await Comment.findById(id);
    if(!comment) {
        return res.status(404).json({error: 'Comment not found'});
    };
    res.status(200).json(comment);
};


// POST one
export const createComment = async (req, res) => {

    // add to the database
    try {
      const comment = await Comment.create(req.body);
      res.status(200).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    };
  };


// DELETE one
export const deleteComment = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Comment not found- no ObjectId'});
    };

    const comment = await Comment.findOneAndDelete({_id: id});
    if(!comment) {
        return res.status(404).json({error: 'Comment not found'});
    };
    res.status(200).json(comment);
}

// UPDATE one
export const updateComment = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Comment not found- no ObjectId'});
    };

    const comment = await Comment.findOneAndUpdate({_id: id}, {...req.body});
    if(!comment) {
        return res.status(404).json({error: 'Comment not found'});
    };
    res.status(200).json(comment);
};


// GET COMMENTS AMOUNT

export const getCommentAmount = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Comment not found- no ObjectId'});
    };

    const commentsAmount = await Comment.aggregate([{$match: {book: new mongoose.Types.ObjectId(id)}}, 
    {$group: {_id: "$book", commentAmount : {$count : {}}}}
]);
    if(!commentsAmount) {
        return res.status(404).json({error: 'Comment not found'});
    };
    res.status(200).json(commentsAmount);

};