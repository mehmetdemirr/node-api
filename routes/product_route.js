const express = require("express");
const Product = require("../models/product_model")

const router = express.Router();
//get 
router.get("/", async(request,response)=>{
    try{
        const products = await Product.find({});
        response.status(200).json(products);
    }catch(error){
        console.log("HATA:"+error.message);
    }
});

//get details
router.get("/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        const products = await Product.findById(id);
        response.status(200).json(products);
    }catch(error){
        console.log("Hataa"+ error.message);
        response.status(500).json({message:"hatalı istek"});
    }
});

//post
router.post("/",async(request,response)=>{
    try {
        const product = await Product.create(request.body);
        response.status(200).json(product);
    }catch(error){
        console.log("Hataa"+ error.message);
        response.status(500).json({message:"hatalı istek"});
    }
});

//update 
router.put("/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        const product = await Product.findByIdAndUpdate(id,request.body);
        if(!product){
            return response.status(404).json({message:"id bulunamdi"});
        }
        const updateProduct = await Product.findById(id);
        response.status(200).json(updateProduct);
    } catch (error) {
        console.log("Hata:"+ error.message);
        response.status(500).json({message:"hatalı istek"});
    }
});

//delete
router.delete("/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return response.status(404).json({message:"id bulunamadı"});
        }
        response.status(200).json({message:"başarılı"});
    } catch (error) {
        console.log("Hata:"+ error.message);
        response.status(500).json({message:"hatalı istek"});
    }
});

module.exports = router;