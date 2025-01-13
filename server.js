import express from "express";
import mongoose from "mongoose";
import User from "./User.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT||5000


mongoose.connect(process.env.MONGODB_URI,)
.then(() => console.log('Mondodb connected'))
.catch (err => console.log('Error', err));

app.post('/signup', async (req,res) => {
const { email , password , name } = req.body;

if (!email || !password || !name){
    return res.status(400).json({ message : "Please Enter all fields"});
}
 try {
    const existinUser = await User.findOne({ email});
    if (existinUser) {
        return res.status(400).json({
            error : "Email already in use"
        });
}
 } catch (err){
    console.log(err);
    res.status(500).json({
        err : "user creation failed"
    })
    
 }
});

app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`);
    
})
