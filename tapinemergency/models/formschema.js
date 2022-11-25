const mongoose=require('mongoose')

const formschema =new mongoose.Schema({
    Name: {type:String,
        required:[true,'Please Provide the name'],
    },
    email: {type:String,
        required:[true,'Please Provide the email'],
    },
    password: {type:String,
        required:[true,'Please Provide the password'],
    },
    personalmobile: {type:Number,
        required:[true,'Please Provide the Your mobile number'],
    },
    Bloodgroup: {type:String,
        required:[true,'Please Provide the Youre Blood Group'],
    },
    PTC: {type:Number,
        required:[true,'Please Provide the Emergency contact number'],
    },
})

module.exports= mongoose.model('Form',formschema);