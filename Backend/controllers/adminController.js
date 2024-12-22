import adminModel from "../models/adminModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const admin = await adminModel.findOne({email})

        if(!admin){
            return res.json({success:false,message:"User Doesn't Exist"})
        }
        const isMatch = await bcrypt.compare(password,admin.password)
        if (!isMatch) {
            return res.json({success:false,message:"Invalid Password"})
        }

        const token = createToken (admin._id);
        res.json({success:true,token})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const register = async(req,res)=>{
    const {email,password} = req.body;
    try {
        //checking is user already exists
        const exists = await adminModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Already exists" })
        }

        //validating email formate & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newadmin = new adminModel({
            email:email,
            password:hashedPassword

        })

        const admin = await newadmin.save()
        const token = createToken(admin._id)
        res.json({success:true,token});
    }
    catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}
export {login,register}