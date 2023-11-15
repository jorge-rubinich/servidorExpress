import cartModel from '../../db/models/carts.model.js'
import mongoose from 'mongoose'

class CartMongoManager {

    constructor() {
        this.cartModel = cartModel
    }

    async add(data) {
        console.log(data)
        return await this.cartModel.create(data)
    }

    async getById(id) {
        return await this.cartModel.findById(id)
            .lean()
            .populate("products.product", ["thumbnails", "title", "price"])

    }

    async getByEmail(email) {
        return await this.cartModel.findOne({email: email})
    }

    async delete(id) {
        return await this.cartModel.findByIdAndDelete(id)
    }

    async addProduct(cartId, productId) {
        const cart = await this.cartModel.findById(cartId);
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
        const cart = await this.cartModel.findById(cartId);
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


export default new CartMongoManager()
