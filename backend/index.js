import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

let app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(
 { origin:"http://localhost:5173",
  credentials:true  
 } 
))

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server is started at ${PORT}`);
});

//http://localhost:8000/api/auth/signup
