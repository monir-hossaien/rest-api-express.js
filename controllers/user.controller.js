
const Users = require('../models/user-model');
const path = require("path");
const fs = require('fs');

// get all Users
const getAllUsers = async (req, res)=>{
    try {
        const allUsers = await Users.find();
        if(allUsers){
            res.status(200).send({status: "success", message: 'users getting success', data: allUsers});
        }else{
            res.status(404).send({status: "fail" , message: 'Users not found'});
        }
    }
    catch (e) {
        console.log(e.message);
    }
}

// get specific user
const getUser = async(req, res)=>{
    try {
        const userId = req.params.id
        const user = await Users.findOne({_id: userId});
        if(user){
            res.status(200).send({status: "success", message: 'user getting success', data: user});
        }else{
            res.status(404).send({status: "fail" , message: 'User not found'});
        }
    }catch (e) {
        console.log(e.message);

    }
}

// create user
const createUser = async (req, res)=>{
    try {
        const {name, email, phone, department} = req.body
        let newUser ={
            name: name,
            email: email,
            phone: phone,
            department: department,
            image: req.file.filename,
        }
        const user = await Users.create(newUser);
        if(user){
            res.status(200).send({status: "success", message: 'user create successfully', data: user});
        }else{
            res.status(404).send({status: "fail" , message: 'User not created'});
        }
    }
    catch (e) {
        res.status(404).send(e.message)
    }


}

// update user
const updateUser = async(req, res)=>{
    try {
        const {name, email, phone, department} = req.body;
        const userId = req.params.id;

        // find existing user
        const existingUser = await Users.findById({_id: userId});
        if (!existingUser) {
            return res.status(404).send({ status: "fail", message: 'User not found' });
        }

        let updateNewUser ={
            name: name,
            email: email,
            phone: phone,
            department: department,
        };

        // Delete the existing image if present
        if (existingUser.image) {
            const existingImagePath = path.join(__dirname, '../public/images', existingUser.image);
            await fs.unlink(existingImagePath, (err) => {
                if (err) console.error(`Failed to delete old image: ${err.message}`);
            });
        }

        // Add new image to the update object
        updateNewUser.image = req.file.filename;

        // Update user data in the database
        let user = await Users.findByIdAndUpdate({_id: userId}, {$set: updateNewUser}, {new:true});
        if(user){
            res.status(200).send({status: "success", message: 'user update successfully', data: user});
        }else{
            res.status(404).send({status: "fail" , message: 'user not updated'});
        }

    }catch (e) {
        res.status(404).send(e.message)
    }
}

// delete user
const deleteUser = async(req, res)=>{
    try {
        const userId = req.params.id;
        let existingUser = await Users.findById({_id: userId});

        if (!existingUser) {
            return res.status(404).send({ status: "fail", message: 'User not found' });
        }

        // Delete the existing image if present
        if (existingUser.image) {
            const existingImagePath = path.join(__dirname, '../public/images', existingUser.image);
            await fs.unlink(existingImagePath, (err) => {
                if (err) console.error(`Failed to delete old image: ${err.message}`);
            });
        }
        const user = await Users.findByIdAndDelete({_id: userId});
        if(user){
            res.status(200).send({status: "success", message: 'user delete successfully', data: user});
        }else{
            res.status(404).send({status: "fail" , message: 'User not found'});
        }
    }catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}