import cartModel from '../db/models/carts.model.js'
import BaseRpository from './base.repository.js'

class CartRepository extends BaseRpository {

    constructor(cartModel) {
        super(cartModel)
    }

    async addProduct(cartId, productId) {
        const cart = await this.model.findById(cartId);
        const isInCart = cart.products.findIndex((p) => p.product._id.equals(productId));
    
        if (isInCart===-1) {
            cart.products.push({ product: productId, quantity: 1 })
        } else {
            cart.products[isInCart].quantity++
        }
    
        await cart.save()
        return cart
    }

    async updateProduct(cartId, productId, quantity) {
        const cart = await this.model.findById(cartId);
        const isInCart = cart.products.findIndex((p) => p.product._id.equals(productId));
    
        if (isInCart===-1) {
            return null
        } else {
            if (quantity===0) {
                cart.products.splice(isInCart, 1)
            } else {
                cart.products[isInCart].quantity = quantity
            }
        }
    
        await cart.save()
        return cart
    }

}


export default new CartRepository
