import { Router } from "express"

import manager from "../managers/productManager.js"

const router =  Router()


router.get("/", async (req, res)=>{
    try {
        const results = await manager.getProducts(req.query)
        const info={"count": results.length}
        res.status(200).send({status: "success",info , results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

router.get("/:pid", async (req, res)=>{
    const {pid} = req.params
    try {
        const results = await manager.getProductById(pid)
        if (results) {
            res.status(200).send({status: "success", results})   
        }  else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }   
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
})

router.post("/", async (req, res)=>{
    try {
        const newProduct= req.body
        const result = await manager.addProduct(newProduct)
        if (!result) {
            res.status(200).send({status: "success", message: "Product added"})   
        } else {
            res.status(400).send({status: "error", error: result})   
        }
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

// update the product with the given id with the given product
router.put("/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const updatesObj= req.body
        const result = await manager.updateProduct(pid, updatesObj)
        if (!result) {
            res.status(200).send({status: "success", message: "Product updated"})   
        } else {
            res.status(400).send({status: "error", error: result})   
        }
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

router.delete("/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const result = await manager.deleteProduct(pid)
        if (result) {
            res.status(200).send({status: "success"})
        } else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }
        
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

export default router
