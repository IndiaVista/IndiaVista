import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import userRouter from './routes/user.routes.js'
import mapRouter from './routes/map.routes.js'
import IternaryRoutes from './routes/itinerary.routes.js'
import calendarRoutes from './routes/calendar.routes.js'
import { ApiError } from "./utils/ApiError.js";
import bodyParser from "body-parser"
import galleryRouter from "./routes/gallery.routes.js"

const app = express();

app.use(cors({
    // origin:process.env.CORS_ORIGIN||'http://localhost:5173',
    origin:process.env.CORS_ORIGIN||'https://india-vista.vercel.app',
    credentials:true,
}));
app.use(bodyParser.json());
app.use(express.json({limit:"5mb"}));  
app.use(express.urlencoded({extended:true,limit:"5mb"}));
app.use(express.static("public"));   
app.use(cookieParser());

app.use("/api/users", userRouter)
app.use("/api/map",mapRouter)
app.use("/api/itinerary",IternaryRoutes)
app.use("/api/events", calendarRoutes) 
app.use("/api/gallery", galleryRouter)


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

