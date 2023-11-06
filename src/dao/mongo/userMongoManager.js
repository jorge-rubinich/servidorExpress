import userModel from '../../db/models/users.model.js'

class UserMongoManager {

    constructor() {
        this.userModel = userModel
    }

    async getAll() {
        return await this.userModel.find().lean()
    }

    async getById(id) {
        return await this.userModel.findById(id)
    }

    async add(data) {
        return await this.userModel.create(data)
    }

    async delete(id) {
        return await this.userModel.findByIdAndDelete(id)
    }
 
    async getByEmail(email) {
        return await this.userModel.findOne({email: email})
    }

 

}

export default new UserMongoManager()