import {Router} from "express"
import manager from "../dao/mongo/userMongoManager.js"

const router = Router()

router.get("/", async (req, res)=>{
    try {
        const results = await manager.getAll()
        res.status(200).send({status: "success", results})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
})  



export default router

