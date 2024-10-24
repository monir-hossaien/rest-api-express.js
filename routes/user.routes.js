
const upload = require('../middleware/fileMiddleware');
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser

} = require("../controllers/user.controller");

const route = require('express').Router();



route.get('/', getAllUsers);
route.post('/', upload.single("image"), createUser);
route.get('/:id', getUser);
route.put('/:id', upload.single("image"), updateUser);
route.delete('/:id', deleteUser);



module.exports = route;