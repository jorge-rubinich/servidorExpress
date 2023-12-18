import userService from "../services/user.service.js"

const getAllUsers =async (req, res)=>{
    try {
        const results = await manager.getAll()
        res.status(200).send({status: "success", results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
}

const getUserById = async (req, res)=>{
    const {pid} = req.params
    try {
        const results = await manager.getById(pid)
        if (results) {
            res.status(200).send({status: "success", results})   
        }  else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }   
    } catch (error ) {
        res.status(500).send({status: "error", error: error.message})   
    }
}

const addUser = async (req, res)=>{
    try {
        const newProduct= req.body
        const result = await manager.add(newProduct)
        if (result.status=="success") {
            res.status(200).send(result)   
        } else {
            console.log(result)
            res.status(400).send(result)   
        }
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }

}

const deleteUser = async (req, res)=>{
    const {pid} = req.params
    try {
        const results = await manager.delete(pid)
        if (results){
            res.status(200).send({status: "success", results})   
        } else {
            res.status(404).send({status: "error", error: "Id "+pid+" not found"})
        }
    } catch (error) { 
        res.status(500).send({status: "error", error: error.message})   
    }
}


export  {getAllUsers, getUserById, addUser, deleteUser}