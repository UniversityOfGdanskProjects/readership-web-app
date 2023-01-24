import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { User } from '../models/usersModel.js';
import log from 'log-to-file';
import { response } from 'express';
// import bcrypt from "bcryptjs";
import { sha256, sha224 } from 'js-sha256';
import jwt  from 'jsonwebtoken';


export const postLoginUser = async (req, res) => {

    User.findOne({ email: req.body.email })
    .then(user => { 
        log("USER FOUNDED")

        const compared = sha256(req.body.password) == user.password
        if (!compared) {
            log("PASSWORD DOESN'T MATCH")
            return res.status(400).json({
                message: "Passwords does not match",
                error: err,
        })} else {
            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
                );
                
            const role = user._id==process.env.ADMIN_ID ? "admin" : "user"
            log(`USER ${user.email} LOGGED IN - postLoginUser`)
            return res.status(200).json({
                isLogin: true,
                id: user._id,
                role: role,
                token,
                });
        } 
    }).catch((error) => {
        response.status(404).json({
        message: "Email not found",
        error,
        });
    });
};

// GET all
export const getUsers = async (req, res) => {
    const users = await User.find({email: {$not: /admin@admin.pl/ }}, {username:1, shelfs:1, commentsAndRatings:1, friends:1}).sort({createdAt: -1});
    log("GET USERS LIST - getUsers");
    res.status(200).json(users);
};

// GET one
export const getUser= async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found- no ObjectId'});
    }

    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    };
    log("USER FOUND - getUser")
    res.status(200).json(user);
};


// POST one
export const createUser = async (req, res) => {

    const hashedPassword = sha256(req.body.password)
    const newData = Object.assign(req.body, {password : hashedPassword});

    // add to the database
    try {
      const user = await User.create(newData);
      log(`CREATED NEW USER - ${user.email}`);
      res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: "Email already taken" });
        // throw new Error("Email already taken");
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