import productService from "../services/product.service.js"
import { validationResult } from "express-validator"

const getAllProducts  = async (req, res)=>{
    try {
        const results = await productService.getAllProducts()
        const info={"count": results.length}
        res.status(200).send({status: "success", results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

}

const getProductById = async (req, res)=>{
    const {pid} = req.params
    try {
        const results = await productService.getProductById(pid)
        if (results) {
            res.status(200).send({status: "success", results})   
        }  else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }   
    } catch (error ) {
        res.status(500).send({status: "error", error: error.message})   
    }
}

const addProduct = async (req, res)=>{
    let errors = validationResult (req) ; 
    if ( !errors.isEmpty()) return res.status(400).send({status: "error", error: errors.errors })
    try {
        const newProduct= req.body
        const result = await productService.addProduct(newProduct)
        if (result.status=="success") {
            res.status(200).send(result)   
        } else {
            console.log(result)
            res.status(400).send(result)   
        }
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

}

const updateProduct = async (req, res)=>{
    let errors = validationResult (req) ; 
    if ( !errors.isEmpty()) return res.json({errors: errors.array() })

    try {
        const {pid} = req.params
        const updatesObj= req.body
        console.log(updatesObj)
        const result = await productService.updateProduct(pid, updatesObj)
        console.log(result)
        if (result) {
            res.status(200).send({status: "success", message: "Product updated"})   
        } else {
            res.status(400).send({status: "error", error: result})   
        }
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
}

    
const deleteProduct = async (req, res)=>{
    try {
        const {pid} = req.params
        const result = await productService.deleteProduct(pid)
        if (result) {
            res.status(200).send({status: "success"})
        } else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }
        
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
    
}

export {getAllProducts, getProductById, addProduct, updateProduct, deleteProduct}
