
const path = require("path");
const cors = require('cors');
const userRoute = require('./routes/user.routes');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/users', userRoute);
app.use(express.static('public'));
app.use(cors());






// home page route
app.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, './views/index.html'));
});

// error routes handling
app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname, './views/error.html'));
})

// server error

module.exports = app;