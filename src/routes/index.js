import { Router } from "express"
import productsRouter from "./products.router.js"
import cartsRouter from "./carts.router.js"
import sessionRouter from "./sessions.router.js" 
import usersRouter from "./users.router.js"
import viewsRouter from "./views.router.js"
const router = new Router()

router.use("/", viewsRouter)
router.use("/api/products", productsRouter)
router.use("/api/carts", cartsRouter)
router.use("/api/sessions", sessionRouter)
router.use("/api/users", usersRouter)

export default router