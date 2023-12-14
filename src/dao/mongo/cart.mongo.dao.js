import cartModel from '../../db/models/carts.model.js'
import baseMongoDao from './base.mongo.dao.js'

class CartMongoDao extends baseMongoDao {

    constructor(model) {
        super(model)
    }

    async add(data) {
        console.log(data)
        return await this.model.create(data)
    }

    async getById(id) {
        return await this.model.findById(id)
            .lean()
            .populate("products.product", ["thumbnails", "title", "price"])

    }

    async getByEmail(email) {
        return await this.model.findOne({email: email})
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id)
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


export default new CartMongoManager()
