
class baseMongoDao {

    constructor(model) {
        this.model = model
    }

    async getAll() {
        return await this.model.find().lean()
    }

    async get(id) {
        return await this.model.findById(id)
    }

    async add(data) {
        return await this.model.create(data)
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {new: true} )
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id)
    }


}

export default baseMongoDao