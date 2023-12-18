import BaseService from "./base.service.js"
import cartRepository from "../repositories/cart.repository.js"
import productRepository from "../repositories/product.repository.js"

class CartService extends BaseService {

    constructor(repository) {  
        super(repository)
    }

    async getCartId(user) {

        if (user.cart) {
            // the user already have a cart
            return user.cart
        }
        // the user does not have a cart, so we find his cart by email
        try {
            const results = await this.repository.getByEmail(user.email)
            if (results){
                // cart founded, we save the cart id in the user session
                user.cart = results._id 
            } else {
                // cart not founded, we create a new cart and save the cart id in the user session
                const cart = await this.repository.add({email: user.email})
                user.cart = cart._id
            }
            return user.cart
        } catch (error) {
            return new Error(error.message)
        }
    }
    
    async addProduct(cid, pid) {

        try {
            // first check if the product exists
            const product = await productRepository.getById(pid)
            if (!product) {
                return new Error("product Id "+pid+" not found")
            }
            const cart= await this.repository.getById(cid)
            if (!cart) {
                return new Error("cart Id "+cid+" not found")
            }
            
            const result= await this.repository.addProduct(cid, pid)
            console.log(result)
            return result

        } catch (error) {
            console.log(error)
            return new Error(error.message)
        }

    }

    async updateProduct(cartId, productId, quantity) {
        return await this.repository.updateProduct(cartId, productId, quantity)
    }

    async deleteProduct (cartId, productId) {
        try {
            const cart= await this.repository.getById(cid)
            if (!cart) {
                // return the empty cart. Controller will handle the error
                return cart
            }
            return await this.repository.updateProduct(cid, pid, 0)
        } catch (error) { 
           return {error: error.message}
        }
    }

    async getByEmail(email) {
        return await this.repository.getByEmail(email)
    }
    
}

export default new CartService(cartRepository)