const express=require('express')
const Form=require('../models/formschema')

const formrouter=express.Router();


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
        res.status(200).send({message:"success"});
    } catch (error) {
        res.send(error);
    }
})
module.exports=formrouter;