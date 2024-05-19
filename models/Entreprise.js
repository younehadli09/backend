const Joi = require('joi');
const { string } = require('joi');
const mongoose = require('mongoose'); 
const { ENUM } = require('sequelize');
const { INTEGER } = require('sequelize');
const { STRING } = require('sequelize');

const Entrepriseschema = new mongoose.Schema({
    id:{
        type :Number,
        unique:true,
        
    },
    numerocontract: {
        type: Number,
        required: true
    },
    Nom_entreprise :{
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
   
    phonenumber: {
        type: Number,
        required: true
    },
    RIB: {
        type: Number,
        required: true
    },
    Adress: {
        type: String,
        required: true
    },
    
    
    },
    {
        timestamps :true
    }
    );
    Entrepriseschema.pre('save', async function (next) {
        const doc = this;
        if (!doc.isNew) {
            return next(); // If it's not a new document, do nothing
        }
    
        try {
            // Find the highest 'id' value and increment it
            const highestId = await mongoose.model('Entreprise').find().sort({ id: -1 }).limit(1);
            doc.id = (highestId.length > 0 ? highestId[0].id + 1 : 1); // Assign the new 'id'
            return next();
        } catch (error) {
            return next(error);
        }
    });

    function validatecreateentreprise(obj){
        const schema= Joi.object({
           id:Joi.string(),
           Nom_entreprise:Joi.string().min(3).max(200).required().trim(),
           email:Joi.string().min(3).max(40).required().email().trim() ,
           phonenumber:Joi.number().required() 
    
    
        })
        return  schema.validate(obj);
    }

    const Entreprise = mongoose.model("Entreprise",Entrepriseschema);
module.exports={
    Entreprise,
    validatecreateentreprise
   
}

