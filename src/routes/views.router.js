import { Router } from "express"

const router = Router()
import * as viewController from "../controllers/viewController.js"

router.get("/", viewController.getAll )   // Retrieve all products
router.get("/realTimeProducts", viewController.getRealTimeProducts )  
router.get("/cart/:cid", viewController.cartView )
router.get("/chat", viewController.chatView)

export default router

