
const Users = require('../models/user-model');


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
            department: department
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
        let updateUser ={
            name: name,
            email: email,
            phone: phone,
            department: department
        };
        const userId = req.params.id
        const user = await Users.findByIdAndUpdate({_id: userId}, {$set: updateUser}, {new:true});
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