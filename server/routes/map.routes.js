import { Router } from "express";
import { insertSiteData,getSitesData,getSite} from "../controllers/map.controller.js";

const router=Router()

router.route("/sites").post(insertSiteData)
router.route("/sites-data").get(getSitesData)
router.route("/getsite/:sr_no").get(getSite)
// console.log("I am in map")
export default router