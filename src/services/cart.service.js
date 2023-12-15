import BaseService from "./base.service"
import cartRepository from "../repositories/cart.repository"

class cartService extends BaseService {

    constructor(repository) {  
        super(repository)
    }

    async addProduct(cartId, productId) {
        return await this.repository.addProduct(cartId, productId)
    }

    async updateProduct(cartId, productId, quantity) {
        return await this.repository.updateProduct(cartId, productId, quantity)
    }

    async deleteProductFromCart (cartId, productId) {
        try {
            const cart= await this.repository.getById(cid)
            if (!cart) {
                res.status(404).send({status: "error", error: "cart Id "+cid+" not found"})
                return
            }
            const results = await this.repository.updateProduct(cid, pid, 0)
            if (results){
                res.status(200).send({status: "success", results})   
            } else {
                res.status(404).send({status: "error", error: "product Id "+pid+" not found"})
            }
        } catch (error) { 
            res.status(500).send({status: "error", error: error.message})   
        }
    }
}
