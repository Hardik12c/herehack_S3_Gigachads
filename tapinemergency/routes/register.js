const express=require('express')
const Form=require('../models/formschema')

const formrouter=express.Router();


formrouter.route('/')
.post(async(req,res)=>{
    try {
        const{Name,email,password,personalmobile,Bloodgroup,PTC}=req.body;
        if(!Name||!email||!password||!personalmobile||!Bloodgroup||!PTC){
           return res.status(404).json({message:"Missing field Please input properly"})
        }
        const createdform=await Form.create(req.body);
        res.status(201).json({message:"success"});
    } catch (error) {
        res.send(error);
    }
})
module.exports=formrouter;