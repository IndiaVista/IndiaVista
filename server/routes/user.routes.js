import {Router} from "express"
import { changePassword, loginUser, registerUser,logoutUser } from "../controllers/user.contoller.js"
import resetPasswordToken from "../controllers/resetPassword.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/register").post(registerUser)
router.route("/signin").post(loginUser)
router.route("/change-password").post(changePassword)
router.route("/forget-password").post(resetPasswordToken)
router.route("/logout").post(verifyJWT,logoutUser)
export default router