import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN|| 'http://localhost:5173',
    credentials:true,
}));

app.use(express.json({limit:"16kb"}));  //parse data is saved to req
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));   //To access local files in public
app.use(cookieParser());

import userRouter from './routes/user.routes.js'
console.log("object")
app.use("/api/users", userRouter)

//http://localhost:8000/api/v1/users/register
export {app}