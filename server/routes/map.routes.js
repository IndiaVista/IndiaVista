import { Router } from "express";
import {
  insertSiteData,
  getSitesData,
  getSite,
  getPaginatedSites,
  saveSite,
} from "../controllers/map.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/sites").post(insertSiteData);
router.route("/sites-data").get(getSitesData);
router.route("/getsite/:sr_no").get(getSite);
router.route("/getPaginatedSites").get(getPaginatedSites);
router.route('/save-site').post(verifyJWT,saveSite);



// console.log("I am in map")
export default router;
