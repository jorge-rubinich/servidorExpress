import cartModel from '../db/models/carts.model.js'
import BaseRepository from './base.repository.js'

class CartRepository extends BaseRepository {

    constructor(model) {
        super(model)
    }

     // override the base getById() method to add .lean()
/*     async getById(id) {
        return await this.model.findById(id)
    } */
    async getById(id) {
        return await this.model.findById(id).populate('products.product')
    }

    async getByEmail(email) {
        return await this.model.findOne({email: email})
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
        console.log("cart.repository.isincart ",isInCart)
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


export default new CartRepository(cartModel)
