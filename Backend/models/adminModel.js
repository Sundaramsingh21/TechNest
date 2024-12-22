import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})

const adminModel = mongoose.models.admin || mongoose.model("admin",userSchema);
export default adminModel;