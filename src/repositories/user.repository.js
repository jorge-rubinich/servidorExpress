import BaseRepository from './base.repository.js'
import userModel from '../db/models/users.model.js'

class UserRepository extends BaseRepository {
    constructor(model) {
        super(model)
    }
 
    async getByEmail(email) {
        return await this.model.findOne({email: email})
    }

}

export default new UserRepository(userModel)