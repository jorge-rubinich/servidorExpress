class UserService {

    constructor(dao) {  
        this.dao = dao
    }

    getAll= async ()=> {
        return await this.dao.getAll()
    }

    getById= async (id)=> {
        return await this.dao.getById(id)
    }

    add= async (data)=> {
        return await this.dao.add(data)
    }
}

export default new UserService