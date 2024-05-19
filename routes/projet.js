const express = require('express');
const router = express.Router();
const Joi = require('joi');
const cors = require('cors'); 
const asyncHandler = require('express-async-handler');
const { Projet,validatecreateproject, validatetypeproject, validatecapaciteproject ,validateeditproject }= require("../models/Projet")
const { Entreprise,validatecreateentreprise  }= require("../models/Entreprise")

const multer = require('multer'); 
const { v4: uuidv4 } = require('uuid'); 

const dotenv= require('dotenv') 
dotenv.config();
/**
 * @desc get  all projects
 * @method get
 * @route /
 * @access public
 */

router.get('/allproject',asyncHandler(async(req,res)=>{
  const projet = await Projet.find();
  res.status(200).json(projet);
}))
/**
 * @desc Register new project
 * @method Post
 * @route /api/projet/create
 * @access public
 */
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

router.post("/create/", asyncHandler(async (req, res) => {
  const { error } = validatecreateproject(req.body);
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  const { Nom_entreprise } = req.body;
  let entreprise  = await Entreprise.findOne({ Nom_entreprise });
  if (!entreprise) {
      return res.status(400).json({ message: "Invalid nom d'entreprise" });
  }

 

  const newProject = new Projet({
      id: req.body.id,
      intitule: req.body.intitule,
      extA: req.body.extA,
      extB: req.body.extB,
      typeprojet: req.body.typeprojet,
      capacite: req.body.capacite,
      devis: req.body.devis,
      schemma: req.body.schemma,
      chargesuivi : req.body.chargesuivi,
      Nom_entreprise: req.body.Nom_entreprise,
      status_entreprise: req.body.status_entreprise,
      date_limit: req.body.date_limit,
      date_limit_tache: req.body.date_limit_tache,
      OC: req.body.OC
  });

  const result = await newProject.save();
  res.status(201).json(result);
}));
 
 /**
 * @desc update project
 * @method PUT
 * @route /:id
 * @access public
 */


router.put("/editproject",asyncHandler(async (req,res)=>{
  const {error}=validateeditproject(req.body); // <-- Typo: errpr should be error
  if(error){
      return res.status(400).json({message  : error.details[0].message});
  }
 const updateproject= await Projet.findByIdAndUpdate(req.params.id,{
  $set: {
    
    id: req.body.id,
    intitule: req.body.intitule,
    extA: req.body.extA,
    extB: req.body.extB,
    typeprojet: req.body.typeprojet,
    OC: req.body.OC,
    capacite: req.body.capacite,
    devis: req.body.devis,
    schemma: req.body.schemma,
    chargesuivi : req.body.chargesuivi,
    Nom_entreprise :req.body.Nom_entreprise,
    status_entreprise : req.body.status_entreprise,
    date_limit : req.body.date_limit ,
    date_limit_tache : req.body.date_limit_tache
 }
 
 },{new :true})
 res.status(200).json(updatedbook);
}))

 
 
 
 
 

  
  
   

  router.delete("/delete/:id",async(req,res)=>{
  
    const deleteproject = await Projet.findById(req.params.id);
    console.log(req.body);
    if(deleteproject){
     await Projet.findByIdAndDelete(req.params.id)
     res.status(200).json({message:"project has been deleted"});
    }else{
     res.status(404).json({message:" project not found"})
    }
 
 })

  module.exports =router;