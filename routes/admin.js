const express = require('express');
const router = express.Router();
const Joi = require('joi');
const cors = require('cors'); 
const asyncHandler = require('express-async-handler');
const { User,validateregisteruser,validateupdateuser }= require("../models/Users")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc get  all users
 * @method get
 * @route /
 * @access public
 */

router.get('/allusers',asyncHandler(async(req,res)=>{
    const user = await User.find();
    res.status(200).json(user);
}))
/**
 * @desc Register new user
 * @method Post
 * @route /api/admin/register
 * @access public
 */

router.post("/register", asyncHandler(async(req, res) => {
    const { error } = validateregisteruser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  const body = req.body;
  if(body){
      console.log(body);
  }
    let newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
        return res.status(400).json({ message: "This user already exists" });
    }
    
    const salt = await bcrypt.genSalt(10)
    req.body.password= await bcrypt.hash(req.body.password,salt)
    
  
    newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        usertype: req.body.usertype,
        service : req.body.service
    });
  
    const result = await newUser.save();
    res.status(201).json(result);
  }));
  

/**
 * @desc update user
 * @method PUT
 * @route /:id
 * @access public
 */


router.put("/update/:id",asyncHandler(async (req,res)=>{
    const {error}=validateupdateuser(req.body); // <-- Typo: errpr should be error
    if(error){
        return res.status(400).json({message  : error.details[0].message});
    }
    const salt = await bcrypt.genSalt(10)
    req.body.password= await bcrypt.hash(req.body.password,salt)
   const updateuser= await User.findByIdAndUpdate(req.params.id,{
    $set: {
       firstname : req.body.firstname,
       lastname : req.body.lastname,
       email : req.body.email,
       username : req.body.username,
       password : req.body.password,
       usertype : req.body.usertype

   }
   
   },{new :true})
   res.status(200).json(updateuser);
}))


/**
 * @desc delete user
 * @method delete
 * @route /:id
 * @access public
 */

router.delete("/delete",async(req,res)=>{
  
    const deleteuser = await User.findById(req.params.id);
    if(deleteuser){
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json({message:"book has been deleted"});
    }else{
     res.status(404).json({message:" book not found"})
    }
 
 })



module.exports =router;