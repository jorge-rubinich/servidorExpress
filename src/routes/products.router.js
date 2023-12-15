import { Router } from "express"
import {dataCheck, updateCheck} from "../middlewares/validations.js"
import * as productController from "../controllers/product.controller.js"

const router =  Router()

router.get("/", productController.getAllProducts )   // Retrieve all products
router.get("/:pid", productController.getProductById)  // retrieve a product by id
router.post("/",  dataCheck() , productController.addProduct )   // Create a new product
router.put("/:pid", updateCheck(), productController.updateProduct) // update the product with the given id with the given product
router.delete("/:pid", productController.deleteProduct)  // Delete a product by id

export default router
