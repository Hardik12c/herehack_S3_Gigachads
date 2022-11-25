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
    var sid = 'AC49c81e8d99b321a0353d4889b07709b6'
    var auth_token = '9d2dee341ac8dbf57e30809841d4c7b4'

    var twilio = require('twilio')(sid, auth_token);

    twilio.messages.create({
        from: "+16402273198",
        to: "+916297809554",
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