
const app = require('./app');
const config = require('./config/config');
const PORT = config.app.port;

const connectDB = require('./config/db');

app.listen(PORT, async ()=>{
    await connectDB()
    console.log(`app run success on http://localhost:${PORT}`)
})