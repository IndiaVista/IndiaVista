import { Router } from "express";
import { insertSiteData } from "../controllers/map.controller.js";
import {getSitesData} from "../controllers/map.controller.js"
const router=Router()

router.route("/sites").post(insertSiteData)
router.route("/sites-data").get(getSitesData)
// console.log("I am in map")
export default router