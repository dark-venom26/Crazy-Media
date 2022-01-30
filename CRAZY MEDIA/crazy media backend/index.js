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

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)

app.listen(port, ()=>{
    console.log(`Crazy Media Backend server running on http://localhost:${port}`);
})
