import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
    {
        name : {type:String,required:true},
        description : {type:String,required:true},
        price :{type:Number,require:true},
        image: {type:String,required:true},
        category : {type:String,required:true},
        stock : {type:String,required:true}
    }
)
const componentModel1 = mongoose.models.component || mongoose.model("component",componentSchema);

export default componentModel1;
