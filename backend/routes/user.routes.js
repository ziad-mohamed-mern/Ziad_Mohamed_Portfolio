const express = require('express');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const User = require("../models/user")
dotenv.config();
const router = express.Router();

router.post('/register', async(req , res) => {
    try{
        const {name , email , password} = req.body;

        const exisitingUser = await User.findOne({email});
    
        if(exisitingUser){
            return res.status(400).json({message: 'User already exists'});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
    
        let user = await newUser.save();
    
        res.status(201).json({
            message: "Signup successful.",
            userId: user._id
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something went wrong",
            message: error.message
        })
    }
});
router.post("/login", async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (!existingUser) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const isValid = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
  
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        {
          _id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: "10d" }
      );
  
      res.status(200).json({
        _id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        token: token,
      });
    } catch (error) {
      console.error("Login Error", error);
      res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    }
});

router.get('/logout', async(req , res) => {
    try {
        res.clearCookie("token", {
          httpOnly: true,
          secure: false,
          sameSite: "strict"
        });
    
        return res.status(200).json({ message: "Logged out successfully" });
      } catch (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Server error" });
      }
});

module.exports = router