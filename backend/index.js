import express from "express" 
import dotenv  from "dotenv"
dotenv.config();


const PORT = process.env.PORT || 5000;

let app = express();

app.get("/",(req,res)=>{
  res.send("hello")
})

app.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`)
})