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

router.get("/getCartId", async (req, res)=>{
    if (!req.session.user) {
        res.status(401).send({status: "error", error: "Debe iniciar sesión para ver su carrito"})
        return
    }
    if (req.session.user.cart) {
        console.log("ya tiene carrito")
        console.log(req.session.user.cart)
        res.status(200).send({status: "success", cartId: req.session.user.cart})
        return
    }

    try {
        console.log("no tiene carrito")
        const results = await manager.getByEmail(req.session.user.email)
        console.log(results)
        if (results){
            req.session.user.cart = results._id 
        } else {
            const cart = await manager.add({email: req.session.user.email})
            req.session.user.cartId = cart._id
        }
        return res.status(200).send({status: "success", cartId: req.session.user.cart})
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
    console.log(req.params)
    const {cid, pid} = req.params
    // first check if the product exists
    const product = await prodManager.getById(pid)
    if (!product) {
        res.status(404).send({status: "error", error: "product Id "+pid+" not found"})
        return
    }
    const cart= await manager.getById(cid)
    if (!cart) {
        res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        return
    }
    console.log(cart)
    try {
        const results = await manager.addProduct(cid, pid)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        }    

    } catch (error) {
        console.log(error)
        res.status(500).send({status: "error", error: error.message})   
    }
}
)


// Delete a cart by id
router.delete("/:cid", async (req, res)=>{
    const {cid} = req.params
    try {
        const results = await manager.delete(cid)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        }
    } catch (error) { 
        res.status(500).send({status: "error", error: error.message})   
    }
})

// delete a product from a cart
router.delete("/:cid/product/:pid", async (req, res)=>{
    const {cid, pid} = req.params
    try {
        const cart= await manager.getById(cid)
        if (!cart) {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
            return
        }
        const results = await manager.updateProduct(cid, pid, 0)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "product Id "+pid+" not found"})
        }
    } catch (error) { 
        res.status(500).send({status: "error", error: error.message})   
    }
})

export default router