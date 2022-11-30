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
        if(!formdata || loginpass!=formdata.password){
            return res.status(401).json({message:"Please Fill Correct Email and Password"});
        }
        res.status(200).send({message:"success",PTC:formdata.PTC});
    } catch (error) {
        res.send(error);
    }
})
module.exports=formrouter;