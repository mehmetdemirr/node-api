require("dotenv").config();
const express = require("express");
const mongoose= require("mongoose");
const Product = require("./models/product_model")

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

//routes
app.get("/product", async(request,response)=>{
    try{
        const products = await Product.find({});
        response.status(200).json(products);
    }catch(error){
        console.log("HATA:"+error.message);
    }
});

app.get("/product/:id",async(request,response)=>{
    try {
        const {id} = request.params;
        const products = await Product.findById(id);
        response.status(200).json(products);
    }catch(error){
        console.log("Hataa"+ error.message);
        response.status(500).json({message:"hatalı istek"});
    }
});

app.post("/product",async(request,response)=>{
    try {
        const product = await Product.create(request.body);
        response.status(200).json(product);
    }catch(error){
        console.log("Hataa"+ error.message);
        response.status(500).json({message:"hatalı istek"});
    }
});

//update 
app.put("/product/:id",async(request,response)=>{
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
app.delete("/product/:id",async(request,response)=>{
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

app.get("/",(request,response,)=>{
    response.send("hello node js ");
});


mongoose
.connect(MONGO_URL)
.then(()=>{
    console.log("Database connected");
    app.listen(PORT,()=>{
        console.log(`dinlemeye başlandıı port : ${PORT}`);
    });
}).catch((error)=>{
    console.log("HATA : database oluşamadı\n" + error);
});
