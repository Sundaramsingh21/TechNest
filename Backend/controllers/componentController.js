import componentModel1 from "../models/componentModel.js";
import fs from 'fs'

//add component item

const addComponent = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const component = new componentModel1({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        stock:"In stock"
    });
    try{
        await component.save();
        res.json({success:true,message:"component Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all components list
const listComponent = async (req,res)=>{
    try {
        const component = await componentModel1.find({});
        res.json({success:true,data:component})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//Remove Component item
const removecomponent =async (req,res)=>{
    try {
        const component = await componentModel1.findById(req.body.id);
        fs.unlink(`uploads/${component.image}`,()=>{})

        await componentModel1.findByIdAndDelete(req.body.id);
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
}

// Update Price of item
const updateprice = async (req,res)=>{
    try {
        const item = await componentModel1.findByIdAndUpdate(req.body.id,{price:req.body.price});
        if (item) {
            res.json({success:true,message:"Updated successfully"})
        } 
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
}
// api for updating stock 
const updateStock = async(req,res)=>{
    try {
        await componentModel1.findByIdAndUpdate(req.body.Id,{stock:req.body.stock});
        res.json({success:true,message:"Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }

}
//Fetch Component by its id
const CompInfo = async(req,res)=>{
    try {
        const Component = await componentModel1.findById(req.body.id);
        res.json({success:true,Data:Component})

    } catch (error) {
        console.log(error);
        
        
    }
}

export  {addComponent,listComponent,removecomponent,updateprice,updateStock,CompInfo};
