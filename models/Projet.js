const Joi = require('joi');
const { string } = require('joi');
const mongoose = require('mongoose'); 
const { ENUM } = require('sequelize');
const { INTEGER } = require('sequelize');
const { STRING } = require('sequelize');






const Projetschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
    },
    id: {
        type: Number,
        unique: true,
        
    },
    intitule: {
        type: String,
        
        trim: true,
        minlength: 6,
        maxlength: 200,
    },
    extA: {
        type: String,
       
        trim: true,
        minlength: 6,
        maxlength: 100,
    },
    extB: {
        type: String,
        trim: true,
        
        minlength: 6,
        maxlength: 100,
    },
    typeprojet: {
        type: String,
        minlength: 2,
        
        maxlength: 100,
    },
   
    capacite: {
        type: String,
        minlength: 1,
        
        maxlength: 10,
    },
    devis: {
        type: String,
        minlength: 6,
        
        maxlength: 500,
    },
    schemma: {
        type: String,
        minlength: 6,
        
        maxlength: 500,
    },
    chargesuivi: {
        type: String,
        minlength: 6,
        
        maxlength: 200,
    },
    Nom_entreprise: {
        type: String,
       
        ref: 'Entreprise',
        
    },
    status_entreprise: {
        type: String,
        
        minlength: 6,
        maxlength: 30,
    },
    date_limit: {
        type: Date,
       
    },
    date_limit_tache: {
        type: Date,
    },
    OC : {
       type : String
    }
}, {
    timestamps: true
});

Projetschema.pre('save', async function (next) {
    const doc = this;
    if (!doc.isNew) {
        return next(); // If it's not a new document, do nothing
    }

    try {
        // Find the highest 'id' value and increment it
        const highestId = await mongoose.model('Projet').find().sort({ id: -1 }).limit(1);
        doc.id = (highestId.length > 0 ? highestId[0].id + 1 : 1); // Assign the new 'id'
        return next();
    } catch (error) {
        return next(error);
    }
});

function validatecreateproject(obj){
    const schema = Joi.object({
        id: Joi.string(),
        intitule: Joi.string().min(6).max(200).trim(),
        extA: Joi.string().min(2).max(100).trim(),
        extB: Joi.string().min(2).max(100).trim(),
        typeprojet: Joi.string().min(2).max(100).trim(),
        capacite: Joi.string().min(1).max(10).trim(),
        devis: Joi.string().min(2).max(500).trim(),
        schemma: Joi.string().min(2).max(500).trim(),
        chargesuivi: Joi.string().min(6).max(200).trim(),
        Nom_entreprise: Joi.string().trim(),
        status_entreprise: Joi.string().min(6).max(30).trim(),
        date_limit: Joi.date(),
        date_limit_tache: Joi.date(),
        OC: Joi.any()
    });

    return schema.validate(obj);
}

function validateeditproject(obj){
    const schema= Joi.object({
       id:Joi.string(),
       intitule:Joi.string().min(6).max(200).trim(),
       extA:Joi.string().min(2).max(100).trim(),
       extB:Joi.string().min(2).max(100).trim() ,
       typeprojet:Joi.string().min(2).max(100).trim(),
       capacite:Joi.string().min(2).max(10).trim(),
       devis:Joi.string().min(2).max(500).trim(),
      
       schemma:Joi.string().min(2).max(500).trim(),
       chargesuivi:Joi.string().min(6).max(200).trim(),
       Nom_entreprise:Joi.string().trim(),
       status_entreprise:Joi.string().min(6).max(30).trim(),
       date_limit:Joi.date(),
       date_limit_tache :date()
        


    })
    return  schema.validate(obj);
}
function validatetypeproject(obj){
  const schema= Joi.object({
  
     typeprojet:Joi.string().min(6).max(100).required().trim()
     



  })
  return  schema.validate(obj);
}
function validatecapaciteproject(obj){
  const schema= Joi.object({
  
     typeprojet:Joi.string().min(6).max(100).required().trim(),
     



  })
  return  schema.validate(obj);
}

const Projet = mongoose.model("Projet",Projetschema);
module.exports={
    Projet,
    validatecreateproject,
    validatetypeproject,
    validatecapaciteproject,
    validateeditproject
}
