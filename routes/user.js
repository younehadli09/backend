const express = require('express');
const router = express.Router();
const Joi = require('joi');
const cors = require('cors'); 
const asyncHandler = require('express-async-handler');
const { User,validateupdatepassword }= require("../models/Users")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/**
 * @desc update user
 * @method PUT
 * @route /:id
 * @access public
 */


router.put("/:id",asyncHandler(async (req,res)=>{
    const {error}=validateupdatepassword(req.body); // <-- Typo: errpr should be error
    if(error){
        return res.status(400).json({message  : error.details[0].message});
    }
   const updateuser= await User.findByIdAndUpdate(req.params.id,{
    $set: {
     
       password : req.body.password

   }
   
   },{new :true})
   res.status(200).json(updateuser);
}))
module.exports =router;