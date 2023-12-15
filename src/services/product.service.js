import BaseService from "./base.service.js"
import productRepository from "../repositories/product.repository.js"

class productService extends BaseService {

    constructor(repository) {  
        super(repository)
    }

    async getPaged(obj) {
        return await this.dao.getPaged(obj)
    }
}

export default new productService(productRepository)