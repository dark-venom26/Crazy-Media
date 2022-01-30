const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", [
    body("username", "Minimum length of username must be atleast 4 characters long").isLength({min: 4}),
    body("email","Email is not valid").isEmail(),
    body("password","Minimum length of password must be atleast 5 characters long").isLength({min: 5}),
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(404).json({success, errors: "Sorry a user with this email already exists"});
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        const data= {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.status(200).json({success, authToken});
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }

})


// login
router.post("/login", [
    body("email", "Email is not valid").isEmail(),
    body("password", "Password can't be blank").exists()
] , async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({success, "errors": errors.array()})
    }

    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({ "error": "User doesn't exists" });
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword){
            return res.status(400).json({success, "error": "Sorry, Password is not valid please try again..." })
        }
        
        const data= {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;

        res.status(200).json({success, authToken});
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
})

// Get user by authenticated token
router.get("/getuser", fetchuser, async (req, res) => {
    let success = false;
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        success = true
        res.status(200).json({success, user});
    }catch(err){
        res.status(500).json({success, error: "Internal Server Error"});
    }
})

module.exports = router;