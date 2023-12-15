class BaseService {
    constructor(repository) {
        this.repository = repository
    }

    async getAll() {
        return await this.repository.getAll()
    }

    async getById(id) {
        if (!id) throw new Error({message :'se debe proporcionar un parametro ID', status: 400}) 
        return await this.repository.getById(id)
    }

    async add(data) {
        return await this.repository.add(data)
    }

    async update(id, data) {
        if (!id) throw new Error({message :'se debe proporcionar un parametro ID', status: 400}) 
        return await this.repository.update(id, data)
    }

    async delete(id) {
        if (!id) throw new Error({message :'se debe proporcionar un parametro ID', status: 400}) 
        return await this.repository.delete(id)
    }

}

export default BaseService