import baseMongoDao from './base.mongo.dao.js'
import productModel from "../../db/models/products.model.js"

class ProductMongoDao extends baseMongoDao {
    constructor() {
        super(productModel)
    }

    async getPaged(obj) {
        const {page=1 , limit=6, sort, query} = obj
        return await this.model.paginate(query, {page, limit, sort, lean:true})
    }

}

export default new ProductMongoDao