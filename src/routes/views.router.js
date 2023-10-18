import { Router } from "express"

const router =  Router()
import manager from "../managers/productManager.js"

router.get("/realtimeproducts", async (req, res)=>{
    try {
        const products = await manager.getProducts(req.query)
        const info={"count": products.length}
        res.render("products", {info , products})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

export default router

