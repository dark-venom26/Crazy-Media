const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const cors = require('cors')
const multer = require('multer')

dotenv.config();

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to mongoDB successfully")
})

const port = 5000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// File Uploading in the backend server using multer
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/images")
    },
    filename: (req, file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer();
app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json('File uploaded successfully.')
    }catch(err){
        console.log(err);
    }
})

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)

app.listen(port, ()=>{
    console.log(`Crazy Media Backend server running on http://localhost:${port}`);
})
