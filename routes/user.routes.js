const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

const route = require('express').Router();



route.get('/', getAllUsers);
route.post('/', createUser);
route.get('/:id', getUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route;