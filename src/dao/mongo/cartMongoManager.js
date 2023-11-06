import cartModel from '../../db/models/carts.model.js'

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
    }

    async getByEmail(email) {
        return await this.cartModel.findOne({email: email})
    }

    async delete(id) {
        return await this.cartModel.findByIdAndDelete(id)
    }
}


export default new CartMongoManager()
