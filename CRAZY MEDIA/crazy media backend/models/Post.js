const mongoose = require("mongoose")
const { Schema } = mongoose

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    hearts: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;