import express from "express"
import  {SignUp, SignIn } from "../controllers/AuthController.mjs"
import VerifyToken from "../middlewares/AuthMiddleware.mjs"

const router = express.Router()

router.post('/signup', SignUp)
router.post('/signin', SignIn)
router.post('/', VerifyToken)

export default router