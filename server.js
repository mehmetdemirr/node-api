require("dotenv").config();
const express = require("express");
const mongoose= require("mongoose");
const Product = require("./models/product_model")

const product_route = require("./routes/product_route");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// product router 
app.use("/api/product",product_route);


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
