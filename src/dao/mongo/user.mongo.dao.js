import baseMongoDao from './base.mongo.dao.js'
import userModel from '../../db/models/users.model.js'

class UserMongoDao extends baseMongoDao {
    constructor() {
        super(userModel)
    }
 
    async getByEmail(email) {
        return await this.Model.findOne({email: email})
    }

}

export default new UserMongoDao()