
const config = require('../config/config');
const dbURL = config.db.url;
const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbURL);
        console.log('Database connect Successfully')
    }catch (e) {
        console.log(e)
    }
}

module.exports = connectDB;