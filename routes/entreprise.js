const express = require('express');
const router = express.Router();
const Joi = require('joi');
const cors = require('cors'); 
const asyncHandler = require('express-async-handler');
const { Entreprise,validatecreateentreprise  }= require("../models/Entreprise")

const dotenv= require('dotenv') 
dotenv.config();
/**
 * @desc get  all
 * @method get
 * @route /
 * @access public
 */

router.get('/allentreprise',asyncHandler(async(req,res)=>{
  const entreprise = await Entreprise.find();
  res.status(200).json(entreprise);
}))
/**
 * @desc Register new project
 * @method Post
 * @route /api/projet/create
 * @access public
 */

router.post("/create", asyncHandler(async(req, res) => {
    const { error } = validatecreateentreprise(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  const body = req.body;
  if(body){
      console.log(body);
  }
    
  
  
    newEntreprise = new Entreprise({
        Nom_entreprise: req.body.Nom_entreprise,
        email:req.body.email,
        phonenumber:req.body.phonenumber
    });
  
    const result = await newEntreprise.save();
    res.status(201).json(result);
  }));
 
 
 
 
 
 
 
  router.post("/addtype", asyncHandler(async(req, res) => {
    const { error } = validatetypeproject(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  const body = req.body;
  if(body){
      console.log(body);
  }
    
  
  
    newTprojet = new Projet({
        typeprojet: req.body.typeprojet,
        
       
    });
  
    const result = await newTprojet.save();
    res.status(201).json(result);
  }));

  router.post("/addtcapacite", asyncHandler(async(req, res) => {
    const { error } = validatecapaciteproject(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
  const body = req.body;
  if(body){
      console.log(body);
  }
    
  
  
    newTcapacite = new Projet({
        tprojet: req.body.tprojet,
        
       
    });
  
    const result = await newTcapacite.save();
    res.status(201).json(result);
  }));

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