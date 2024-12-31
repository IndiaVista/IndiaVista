import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
import mapRouter from './routes/map.routes.js'
import { ApiError } from "./utils/ApiError.js";
import bodyParser from "body-parser"


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN||'http://localhost:5173',
    credentials:true,
}));
app.use(bodyParser.json());
app.use(express.json({limit:"16kb"}));  //parse data is saved to req
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));   //To access local files in public
app.use(cookieParser());



console.log("I am in App.js of server")
app.use("/api/users", userRouter)
app.use("/api/map",mapRouter)
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

