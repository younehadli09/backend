const Joi = require('joi');
const { string } = require('joi');
const mongoose = require('mongoose'); 
const { ENUM } = require('sequelize');
const { INTEGER } = require('sequelize');
const { STRING } = require('sequelize');

const Usersschema = new mongoose.Schema({
firstname :{
    type :String,
    required : true ,
    trim :true,
    minlength :3,
    maxlength:200,

},
lastname :{
    type :String,
    required : true ,
    trim :true,
    minlength :3,
    maxlength:200,

},
username :{
    type :String,
    required : true ,
    trim :true,
    minlength :3,
    maxlength:200,

},
email :{
    type :String,
    required : true ,
    trim :true,
    minlength :3,
    maxlength:40,

},
password:{
    type: String,
    required : true,
    trim    : true,
    minlength:6
    

},
usertype: {
    type: String,
    enum: ['admin',  'employee','chef service'], 
    required: true
},
service :{
    type : String,
    enum: ['serviceFO',  'serviceET'], 
    required: true
}

},
{
    timestamps :true
}
);

//validate create user
function validateregisteruser(obj){
    const schema= Joi.object({
        firstname:Joi.string().min(3).max(200).required().trim(),
        lastname:Joi.string().min(3).max(200).required().trim(),
        email:Joi.string().min(5).max(100).required().email().trim() ,
        username:Joi.string().min(2).max(200).required().trim(),
        password:Joi.string().min(6).required().trim(),
        usertype:Joi.string().required(),
        service:Joi.string().required()

    })
    return  schema.validate(obj);
}
//validate login user
function validateLoginuser(obj){
    const schema= Joi.object({
     
        email:Joi.string().min(5).max(100).required().trim(),
        password:Joi.string().min(6).required().trim(),
        
    })
    return  schema.validate(obj);
}
function validateupdateuser(obj){
    const schema =Joi.object({
        firstname:Joi.string().min(3).max(200).trim(),
        lastname:Joi.string().min(3).max(200).trim(),
        email:Joi.string().min(5).max(100).email().trim() ,
        username:Joi.string().min(2).max(200).trim(),
        password:Joi.string().min(6).trim(),
        usertype:Joi.string()
    })
   return  schema.validate(obj);
}
function validateupdatepassword(obj){
    const schema =Joi.object({
    
        password:Joi.string().min(6).trim()
    })
   return  schema.validate(obj);
}
const User = mongoose.model("Users",Usersschema);
module.exports = {
        User,
        validateregisteruser,
        validateLoginuser,
        validateupdateuser,
        validateupdatepassword
}