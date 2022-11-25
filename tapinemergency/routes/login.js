const express=require('express')
const Form=require('../models/formschema')

const formrouter=express.Router();

// let PTCmobile=0;

formrouter.route('/')
.post(async(req,res)=>{
    try {
        const{logemail,loginpass}=req.body;
        if(!logemail||!loginpass){
           return res.status(404).json({message:"Please fill in the email and password"})
        }
        const formdata=await Form.findOne({email:logemail});
        if(loginpass!=formdata.password){
            return res.status(401).json({message:"Password not matching"});
        }
        // window.mobilenumber.mobile=formdata.PTC;
        res.status(200).send({message:"success",PTC:formdata.PTC});
    } catch (error) {
        res.send(error);
    }
})
module.exports=formrouter;