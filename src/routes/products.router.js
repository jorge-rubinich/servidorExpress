import { Router } from "express"

import manager from "../dao/mongo/productMongoManager.js"
import {dataCheck, updateCheck} from "../middlewares/validations.js"
import { validationResult } from "express-validator"

const router =  Router()


router.get("/", async (req, res)=>{
    try {
        const results = await manager.getAll()
        const info={"count": results.length}
        res.status(200).send({status: "success", results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

router.get("/:pid", async (req, res)=>{
    const {pid} = req.params
    try {
        const results = await manager.getById(pid)
        if (results) {
            res.status(200).send({status: "success", results})   
        }  else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }   
    } catch (error ) {
        res.status(500).send({status: "error", error: error.message})   
    }
})

router.post("/",  dataCheck() , async (req, res)=>{
    let errors = validationResult (req) ; 
    if ( !errors.isEmpty()) return res.status(400).send({status: "error", error: errors.errors })
    try {
        const newProduct= req.body
        const result = await manager.add(newProduct)
        if (result.status=="success") {
            res.status(200).send(result)   
        } else {
            console.log(result)
            res.status(400).send(result)   
        }
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

// update the product with the given id with the given product
router.put("/:pid", updateCheck(), async (req, res)=>{
    let errors = validationResult (req) ; 
    if ( !errors.isEmpty()) return res.json({errors: errors.array() })

    try {
        const {pid} = req.params
        const updatesObj= req.body
        console.log(updatesObj)
        const result = await manager.update(pid, updatesObj)
        console.log(result)
        if (result) {
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
        const result = await manager.delete(pid)
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
