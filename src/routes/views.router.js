import { Router } from "express"

const router =  Router()
import manager from "../dao/mongo/productMongoManager.js"
import chatManager from "../dao/mongo/chatMongoManager.js"
import cartManager from "../dao/mongo/cartMongoManager.js"
import { moneyFormat } from "../utils.js"

router.get("/", async (req, res)=>{
    try {
        const results = await manager.getPaged(req.query)
        results.docs.forEach(p => {
            p.Price = moneyFormat(p.price)
        })
        const retObj = {status: "success",
        payload: results.docs, 
        totalPages: results.totalPages, 
        prevPage: results.prevPage, 
        nextPage:results.nextPage , 
        page: results.page, 
        hasPrevPage: results.hasPrevPage,
        hasNextPage: results.hasNextPage, 
        prevLink: results.hasPrevPage? createLink(req.query, results.prevPage) : null,
        nextLink: results.hasNextPage? createLink(req.query, results.nextPage) : null,
        user : req.session.user
        }

        res.render("home",retObj)   
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
})

function createLink(reqQuery, page) {
    const {limit=6, sort, filter} = reqQuery
    return `/?limit=${limit}&page=${page}`
}

router.get("/realTimeProducts", async (req, res)=>{
    try {
        const products = await manager.getAll(req.query)
        const info={"count": products.length}
        res.render("realTimeProducts", {info , products})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

router.get("/cart/:cid", async (req, res)=>{
    const {cid} = req.params
    try {
        const cart= await cartManager.getById(cid)
        cart.products.forEach(p => {
            p.product.stPrice = moneyFormat(p.product.price)
            p.subtotal = p.quantity * p.product.price
            p.stSubtotal = moneyFormat(p.subtotal)
        })
        res.render("cart", {email: cart.email, products: cart.products, user: req.session.user})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
})

router.get("/chat", async (req, res)=>{
    try {
        const messages = await chatManager.getAll(req.query)
        res.render("chat", {messages})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

})

export default router

