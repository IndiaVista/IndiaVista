import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js";
const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));

app.use(express.json({limit:"16kb"}));  //parse data is saved to req
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));   //To access local files in public
app.use(cookieParser());

import userRouter from './routes/user.routes.js'
app.use("/api/users", userRouter)

// Error-handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            statusCode: err.statusCode
        });
    }

    // If it's not a custom ApiError, return a generic server error
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server",
        statusCode: 500
    });
});

//http://localhost:8000/api/v1/users/register
export {app}