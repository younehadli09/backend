const express = require('express');
const router = express.Router();
const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const { User, validateLoginuser } = require("../models/Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Adjust the login endpoint to set the token in the response header
router.post("/login", asyncHandler(async (req, res) => {
    const { error } = validateLoginuser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET_KEY);
    
    let redirect;
    
    
    if (user.usertype === "admin") {
        redirect = "/Admin";
    } else {
       
        if (user.usertype === "employee") {
            redirect = "/MainPage/CreateProject/" + user._id;
            
        } else {

            redirect = "/CreateProjectChef/" + user._id;
        }
        
    }
    
    const responseData = { token, redirect, _id: user._id };
    
    console.log("Login successful");
    console.log("Redirect:", redirect);
    

    // Set the token in the response header
    res.setHeader('Authorization', `Bearer ${token}`);

    // Respond with the responseData
    res.status(200).json(responseData);
}));

// Adjust the logout endpoint to clear the token from the client-side
router.get('/logout', function (req, res, next) {
    // Clear any authentication-related data from the client-side (e.g., localStorage)
    // Also, ensure that the session is destroyed if you're using session-based authentication

    // Respond with the redirect URL
    res.status(200).json({ redirect: "/" });
});

module.exports = router;

