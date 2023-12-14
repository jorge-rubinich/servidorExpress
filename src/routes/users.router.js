import {Router} from "express"
import * as userController from "../controllers/userController.js"


const router = Router()

router.get("/", userController.getAll )   // Retrieve all users
router.get("/:uid", userController.getById)  // retrieve a user by id
router.post("/", userController.addUser )   // Create a new user    
router.delete("/:uid", userController.deleteUser)  // Delete a user by id



export default router

