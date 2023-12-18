import chatModel from "../../db/models/chat.model.js"

class chatMongoManager {
    constructor() {
        this.chatModel = chatModel
    }

    async getAll() {
        return await this.chatModel.find().lean()
    }

    async add(data) {
        return await this.chatModel.create(data)
    }

}

export default new chatMongoManager