import {Router} from "express"
import * as userController from "../controllers/user.controller.js"


const router = Router()

router.get("/", userController.getAllUsers)   // Retrieve all users
router.get("/:uid", userController.getUserById)  // retrieve a user by id
router.post("/", userController.addUser)   // Create a new user    
router.delete("/:uid", userController.deleteUser)  // Delete a user by id



export default router

