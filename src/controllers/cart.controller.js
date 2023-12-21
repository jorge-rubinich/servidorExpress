import cartService from "../services/cart.service.js"

const addCart =  async (req, res)=>{
    const cartData= req.body
    try {
        const results = await cartService.add(cartData)
        res.status(200).send({status: "success", results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
}

const getCartId = async (req, res)=>{
    if (!req.session.user) {
        res.status(401).send({status: "error", error: "Debe iniciar sesión para ver su carrito"})
        return
    }
    if (req.session.user.cart) {
        res.status(200).send({status: "success", cartId: req.session.user.cart})
        return
    }
    try {
        const cartId = await cartService.getCartId(req.session.user)
        console.log("cartId: "+cartId)

        if (!cartId) {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
            return
        }
        res.status(200).send({status: "succes", cartId})
    } catch (error) {
        console.log(error)
        res.status(500).send({status: "error", error: error.message})   
    }
}    

const getCartById = async (req, res)=>{
    const {cid} = req.params
    try {
        const results = await cartService.getById(cid)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        }
    } catch (error) { 
        res.status(500).send({status: "error", error: error.message})   
    }
}

const addProduct= async (req, res)=>{
    const {cid, pid} = req.params
    try {
        const result= cartService.addProduct(cid, pid)
        if (result.error) {
            return res.status(500).send({status: "error", error: result.error})
        }
        res.status(200).send({status: "success", result})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
}

const deleteCart = async (req, res)=>{
    const {cid} = req.params
    try {
        const results = await this.cartService.delete(cid)
        if (results.error) {
            res.status(500).send({status: "error", error: results.error})
        }
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
        }
    } catch (error) { 
        res.status(500).send({status: "error", error: error.message})   
    }
}

const deleteProduct = async (req, res)=>{
    const {cid, pid} = req.params
    try {
        const results = await cartService.deleteProduct(cid, pid)
        if (results.error) {
            return res.status(500).send({status: "error", error: results.error})
        }
        return res.status(200).send({status: "success", results})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({status: "error", error: error.message})
    }
}

export {addCart, getCartId, getCartById, addProduct, deleteCart, deleteProduct}