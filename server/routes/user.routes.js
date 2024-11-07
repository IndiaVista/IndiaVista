import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.contoller.js"

const router = Router()


router.route("/register").post(registerUser)
router.route("/signin").post(loginUser)

export default router