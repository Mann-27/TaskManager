const express= require("express");
const User=require('../models/User');
const jwt=require('jsonwebtoken');

const app=express.Router();

const bcrypt=require('bcrypt');
// to check api 
app.get('/',(req,res)=>{
    res.json('User routes are working!');
});

// api to register
app.post("/register",async(req,res)=>{
    console.log('hit here');
    const{ firstName,lastName,email,password }=req.body; 
    console.log(firstName,email);
   
   try {
        const userAlreadyExists=await User.findOne({
        email:email
        });
 
        if(userAlreadyExists)
            {
                     res.status(411).json({msg:"Email already exists.Please use different mail id."});
                     return;
            }
        const user= await User.create({firstName,lastName,email,password});//create new user object ,and register a user
        
        res.status(201).json({msg:"Account Created,User Registered Successfully.",id:user._id})
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:err});
    }
    
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({ error: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });

        if (!user) { // if user does not exist, throw error.
            return res.status(404).send({ error: 'Unable to login, user not found.' });
        }

        const matches = await bcrypt.compare(password, user.password);

        if (!matches) {
            return res.status(401).send({ error: 'Unable to login, invalid credentials.' });
        }

        const token = jwt.sign(
            { _id: user.id.toString() },
            process.env.JWT_SECRET_KEY,
            {expiresIn:'1h'}
        );

        res.status(200).json({ token, message: "Logged in Successfully." });
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: 'An error occurred while trying to log in.' });
    }
});
module.exports=app;
