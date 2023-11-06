import { Router } from "express"

import manager from "../dao/mongo/cartMongoManager.js"
import prodManager from "../dao/mongo/productMongoManager.js"

const router =  Router()

// Create a new cart
router.post("/", async (req, res)=>{
    try {
        console.log(req.body)
        const results = await manager.add(req.body)
        res.status(200).send({status: "success", results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
})

// retrieve a cart by id
router.get("/:cid", async (req, res)=>{
    const {cid} = req.params
    try {
        const results = await manager.getById(cid)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        }
    } catch (error) { 
        res.status(500).send({status: "error", error: error.message})   
    }
})

// Add a product to a cart  
router.post("/:cid/product/:pid", async (req, res)=>{
    const {cid, pid} = req.params
    // first check if the product exists
    const product = await prodManager.getProductById(pid)
    if (!product) {
        res.status(404).send({status: "error", error: "product Id "+pid+" not found"})
        return
    }
    try {
        const results = await manager.addProduct(cid, pid)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        }    

    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
}
)

export default router