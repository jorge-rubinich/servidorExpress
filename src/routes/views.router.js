import { Router } from "express"
import { authToken } from "../utils.js"
const router = Router()
import * as viewController from "../controllers/view.controller.js"

router.get("/", authToken, viewController.getAll )   // Retrieve all products
router.get("/realTimeProducts", viewController.getRealTimeProducts )  
router.get("/cart/:cid", viewController.cartView )
//router.get("/chat", viewController.chatView)

export default router

