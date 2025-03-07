import { CreateIternary,GetItinerary } from '../controllers/Itinerary.controller.js'
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/create-Itinerary").post(verifyJWT,CreateIternary);
router.route("/get-Itinerary").get(verifyJWT,GetItinerary)
export default router;