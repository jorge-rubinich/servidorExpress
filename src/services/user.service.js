import BaseService from "./base.service.js"
import userRepository from "../repositories/user.repository.js"

class UserService extends BaseService {

    constructor(repository) {  
        super(repository)
    }

    async getByEmail(email) {
        return await this.repository.getByEmail(email)
    }
}

export default new UserService(userRepository)