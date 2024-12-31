import { CreateIternary } from "../controllers/Itinerary.controller.js";
import { Router } from "express";


const router=Router()

router.route("/create-Itinerary").post(CreateIternary);
export default router;