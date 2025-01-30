import { Router } from 'express';
import { getEvent } from '../controllers/calendar.controller.js';
import { saveEvents } from '../controllers/calendar.controller.js';

const router = Router();

router.route("/findEvent").get(getEvent)
router.route("/saveEventData").post(saveEvents)

export default router;