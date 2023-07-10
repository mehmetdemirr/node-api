const express = require("express");

const app = express();

//routes
app.get("/",(request,response,)=>{
    response.send("hello node js ");
})
app.listen(5050,()=>{
    console.log("dinlemeye başlandıı");
});