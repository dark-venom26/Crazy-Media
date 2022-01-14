const router = require("express").Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const Post = require("../models/Post");

// Get a post
router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({"data" : post});
    }catch(err){
        res.status(500).json(err);
    }
})

// Create a post
router.post("/", fetchuser, async (req, res)=>{
    const {desc, img, likes} = req.body
    const newPost = new Post({
        desc, img, likes, userId: req.user.id
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

// Update a post
router.put("/:id", fetchuser, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId.toString() === req.user.id){
            await post.updateOne({$set : req.body});
            res.status(200).json({"success" : "Post has been updated successfully"});
        }else{
            res.status(403).json({"error" : "You can update only your post"});
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// Delete a post
router.delete("/:id", fetchuser, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId.toString() === req.user.id){
            await post.deleteOne();
            res.status(200).json({"success" : "Post has been deleted successfully"});
        }else{
            res.status(403).json({"error" : "You can delete only your post"});
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// Like / Dislike a post
router.put("/:id/like", fetchuser, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.user.id)){
            await post.updateOne({$push: {likes: req.user.id}});
            res.status(200).json({"success" : "Post has been liked"});
        }else{
            await post.updateOne({$pull: {likes: req.user.id}})
            res.status(200).json({"success" : "Post has been disliked"});
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// Heart / UnHeart a post
router.put("/:id/heart", fetchuser, async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.hearts.includes(req.user.id)){
            await post.updateOne({$push: {hearts: req.user.id}});
            res.status(200).json({"success" : "Post has been Heart"});
        }else{
            await post.updateOne({$pull: {hearts: req.user.id}})
            res.status(200).json({"success" : "Post has been UnHeart"});
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// Get timeline posts
router.get("/timeline/all", fetchuser, async (req, res)=>{
    try{
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId : friendId});
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(err){
        res.status(500).json(err);
    }
})

// Get user's posts
router.get("/profile/:username", async (req, res)=>{
    try{
        const currentUser = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: currentUser._id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;