import productModel from "../../db/models/products.model.js"

class ProductMongoManager {
    constructor() {
        this.productModel = productModel
    }

    async getAll() {
        return await this.productModel.find().lean()
    }

    async getPaged(obj) {
        const {page=1 , limit=6, sort, query} = obj
        return await this.productModel.paginate(query, {page, limit, sort, lean:true})
    }

    async getById(id) {
        return await this.productModel.findById(id)
    }

    async add(data) {
        return await this.productModel.create(data)
    }

    async update(id, data) {
        return await this.productModel.findByIdAndUpdate(id, data, {new: true})
    }

    async delete(id) {
        return await this.productModel.findByIdAndDelete(id)
    }
}

export default new ProductMongoManager