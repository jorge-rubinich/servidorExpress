import BaseRepository from './base.repository.js'
import userModel from '../db/models/users.model.js'

class UserRepository extends BaseRepository {
    constructor() {
        super(userModel)
    }
 
    async getByEmail(email) {
        return await this.Model.findOne({email: email})
    }

}

export default new UserRepository()