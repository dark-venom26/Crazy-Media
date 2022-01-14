const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser")

// Get User
router.get("/", async (req, res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username: username});
        const {password, updatedAt, ...other}  = user._doc;
        res.status(200).json(other)
    }catch(err){
        res.status(500).send("Internal Server error")
    }
})

// Update User
router.put("/:id", fetchuser, async (req, res)=>{

    if(req.user.id === req.params.id || req.body.isAdmin){
        if(req.body.password){
            if(req.body.password>=5){
                try{
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }catch(err){
                    res.status(500).send("Internal Server error")
                }
            }else{
                return res.status(400).json({error: "Minimum length of password must be atleast 5 characters"})
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json({"success":"Account has been updated"})
        }catch(err){
            res.status(500).send("Internal Server error")
        }

    }else{
        return res.status(403).json({"error":"You can update only your account"})
    }
})

// Delete User
router.delete("/:id", fetchuser, async (req, res)=>{
    if(req.user.id === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({"success":"Account has been deleted"})
        }catch(err){
            res.status(500).send("Internal Server error")
        }

    }else{
        return res.status(403).json("error","You can update only your account")
    }
})

// Follow User
router.put("/follow/:id", fetchuser, async (req, res)=>{
    if(req.user.id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id)
            if(!user.followers.includes(req.user.id)){
                await user.updateOne({$push: {followers: req.user.id}});
                await currentUser.updateOne({$push: {followings: req.params.id}})
                res.status(200).json({"success":"User has been followed"})
            }else{
                res.status(403).json({"error":"You already followed this user"})
            }
        }catch(err){
            res.status(500).send(err)
        }
    }else{
        res.status(403).json({"error": "You can't follow yourself"})
    }
})

// Unfollow user
router.put("/unfollow/:id", fetchuser, async (req, res)=>{
    if(req.user.id !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id)
            if(user.followers.includes(req.user.id)){
                await user.updateOne({$pull: {followers: req.user.id}});
                await currentUser.updateOne({$pull: {followings: req.params.id}})
                res.status(200).json({"success":"User has been unfollowed"})
            }else{
                res.status(403).json({"error":"You aren't following this user"})
            }
        }catch(err){
            res.status(500).send(err)
        }
    }else{
        res.status(403).json({"error": "You can't unfollow yourself"})
    }
})

module.exports = router;