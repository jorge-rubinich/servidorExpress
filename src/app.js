import express, { query } from "express"
import {manager} from "./productManager.js"

const PORT = 3000
const app= express()

app.get("/products", async (req, res)=>{
    try {
        const results = await manager.getProducts(req.query)
        const info={"count": results.length}
        res.status(200).send({status: "ok",info , results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

app.get("/products/:pid", async (req, res)=>{
    const {pid} = req.params
    try {
        const results = await manager.getProductById(pid)
        if (results) {
            res.status(200).send({status: "ok", results})   
        }  else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }   
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
})


app.listen(PORT, ()=>{
    console.log("Escuchando en Puerto "+PORT)
})