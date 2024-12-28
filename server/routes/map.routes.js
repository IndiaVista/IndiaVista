import { Router } from "express";
import {
  insertSiteData,
  getSitesData,
  getSite,
  getPaginatedSites,
  CreateIternary,
} from "../controllers/map.controller.js";

const router = Router();

router.route("/sites").post(insertSiteData);
router.route("/sites-data").get(getSitesData);
router.route("/getsite/:sr_no").get(getSite);
router.route("/getPaginatedSites").get(getPaginatedSites);
router.route("/create-Iternary").post(CreateIternary);
// console.log("I am in map")
export default router;
