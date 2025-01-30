import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js";
import bodyParser from "body-parser"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN||'http://localhost:5173',
    credentials:true,
}));
app.use(bodyParser.json());
app.use(express.json({limit:"5mb"}));  
app.use(express.urlencoded({extended:true,limit:"5mb"}));
app.use(express.static("public"));   
app.use(cookieParser());

import userRouter from './routes/user.routes.js'
import calendarRoutes from './routes/calendar.routes.js'
import mapRouter from './routes/map.routes.js'

app.use("/api/users", userRouter)
app.use("/api/events", calendarRoutes) 
app.use("/api/users", userRouter)
app.use("/api/map",mapRouter)

app.use((err, req, res, next) => {
    console.error(err); 

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
            statusCode: err.statusCode
        });
    }

    res.status(500).json({
        success: false,
        message: "Something went wrong on the server",
        statusCode: 500
    });
});

export {app}

