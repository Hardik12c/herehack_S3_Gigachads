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

app.get('/sendmess', (req, res) => {
    var sid = process.env.SID;
    var auth_token = process.env.API;

    var twilio = require('twilio')(sid, auth_token);

    twilio.messages.create({
        from: process.env.PHONE,
        to: "+918869017426",
        body: "This is an Emergency message"
    })
        .then((res) => (console.log('message has sent!')))
        .catch((err) => {
            console.log(err);
        })
})
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