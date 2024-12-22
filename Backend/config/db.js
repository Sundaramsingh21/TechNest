import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://sundaramsingh237:Sundaram2112@cluster0.zafxk.mongodb.net/TechNest').then(()=>console.log("DB Connected"));
}