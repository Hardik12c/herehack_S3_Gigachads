require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const registerouter = require('./routes/register')
const loginrouter = require('./routes/login')
app.use(express.static('./public'));
app.use(express.json());

app.use('/register', registerouter);
app.use('/login', loginrouter);


const port = 3000;

const startserver = async () => {
    try {
        await connectDB(process.env.connectionstring);
        app.listen(port, () => {
            console.log(`app listening on port http://localhost:${port}/`)
        })
    } catch (error) {
        console.log(error);
    }
}
startserver();