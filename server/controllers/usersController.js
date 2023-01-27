import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { User } from '../models/usersModel.js';
import log from 'log-to-file';
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
            if(role=="admin") {
                log(`ADMIN LOGGED IN - postLoginUser`)
                return res.status(200).json({
                    isLogin: true,
                    role: role,
                    token,
                    });

            }
            log(`USER ${user.email} LOGGED IN - postLoginUser`)
            return res.status(200).json({
                isLogin: true,
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth: user.dateOfBirth,
                role: role,
                token,
                });
        } 
    }).catch((error) => {
        log("Email or username not found")
        return res.status(404).json({
        message: "Email or username not found",
        error,
        });
    });
};

// GET all
export const getUsers = async (req, res) => {
    const users = await User.find({email: {$not: /admin@admin.pl/ }}, 
    {username:1, shelfs:1, commentsAndRatings:1, friends:1, email:1, firstName:1, dateOfBirth: 1, lastName: 1}).sort({createdAt: -1});
    log("GET USERS LIST - getUsers");
    res.status(200).json(users);
};

// GET one
export const getUser= async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        log("User not found- no ObjectId")
        return res.status(404).json({error: 'User not found- no ObjectId'});
    }

    const user = await User.findById(id);
    if(!user) {
        return res.status(404).json({error: 'User not found'});
    };
    log("USER FOUND - getUser")
    return res.status(200).json(user);
};


// POST one
export const createUser = async (req, res) => {

    const hashedPassword = sha256(req.body.password)
    const newData = Object.assign(req.body, {password : hashedPassword});

    // add to the database
    try {
      const user = await User.create(newData);
      log(`CREATED NEW USER - ${user.email}`);
      const userWithoutRead = await User.findOneAndUpdate({_id: user.id}, {shelfs: {"read":[]}});
      const userWithRead = await User.findOne({_id: user._id});
      return res.status(200).json(userWithRead);
    } catch (error) {
        return res.status(400).json({ error: "Email or username already taken" });
        // throw new Error("Email already taken");
    };
  };


// DELETE one
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    log("DELETING USER...")

    if(!mongoose.Types.ObjectId.isValid(id)) {
        log("USER NOT FOUND - NO OBJECT ID")
        return res.status(404).json({error: 'User not found- no ObjectId'});
    };

    User.findOneAndDelete({_id: id}).then(result => {
        log(`DELETED user ${id}`);
        return res.status(200).json({id: id});
    }).catch(err => {
        log("COULDN'T DELETED USER")
        console.log(err);
        return res.status(404).json({error: err.message});
    })
    
}

// UPDATE one
export const updateUser = async (req, res) => {
    const { id } = req.params;
    // console.log(req);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        log('User not found- no ObjectId');
        return res.status(404).json({error: 'User not found- no ObjectId'});
    };

    User.findOne({ email: req.body.email })
    .then(async user => { 
        log("USER FOUNDED")

        const compared = sha256(req.body.password) == user.password
        if (!compared) {
            log("PASSWORD DOESN'T MATCH")
            return res.status(400).json({
                message: "Passwords does not match",
                error: err,
        })} else {
            const user = await User.findOneAndUpdate({_id: id}, {...req.body, password: sha256(req.body.password)});
            const updatedUser = await User.findOne({_id: user._id});
            log('User updated');
            res.status(200).json(updatedUser);
        };
    })

};