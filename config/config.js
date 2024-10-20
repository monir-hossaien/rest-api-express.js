require('dotenv').config();

const dev= {
    app: {
        port: process.env.PORT || "mongodb://localhost:27017/user_management"
    },
    db:{
        url: process.env.DB_URL
    }
}

module.exports = dev;

