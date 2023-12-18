import BaseRepository from './base.repository.js'
import productModel from "../db/models/products.model.js"

class ProductRepository extends BaseRepository {
    constructor(model) {
        super(model)
    }

    async getPaged(obj) {
        const {page=1 , limit=6, sort, query} = obj
        return await this.model.paginate(query, {page, limit, sort, lean:true})
    }

}

export default new ProductRepository(productModel)