import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { CreateIternary, GetItinerary, GetUserItineraries, DeleteItinerary } from "../controllers/Itinerary.controller.js";

const router = express.Router();

router.route("/create-Itinerary").post(verifyJWT, CreateIternary);
router.route("/get-Itinerary").get(verifyJWT, GetItinerary);
router.route("/user-itineraries").get(verifyJWT, GetUserItineraries);
router.route("/:itineraryId").delete(verifyJWT, DeleteItinerary);

export default router;