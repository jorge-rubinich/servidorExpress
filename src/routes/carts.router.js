import { Router } from "express"
import * as cartController from "../controllers/cartController.js"



const router =  Router()

router.post("/", cartController.addCart )   // Create a new cart
router.get("/getCartId", cartController.getCartId )
router.get("/:cid", cartController.getCartById)  // retrieve a cart by id
router.post("/:cid/product/:pid", cartController.addProductToCart)  // Add a product to a cart  
router.delete("/:cid", cartController.deleteCart)  // Delete a cart by id
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart)  // delete a product from a cart


export default router