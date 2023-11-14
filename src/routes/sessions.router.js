import exp from "constants"
import {Router} from "express"
import userManager from "../dao/mongo/userMongoManager.js"

const router = Router()

router.post("/signUp", async (req, res)=>{
    const {first_name, last_name, email, password} = req.body
    if (!first_name || !last_name || !email || !password){
        res.status(400).send({status: "error", error: "Debe completar todos los campos"})
        return
    }
    try {
        const userCreated = await userManager.add(req.body)
        res.status(200).send({status: "success", user: userCreated})
    } catch (error) {
        res.status(500).send({status: "error", error: error.message})   
    }
    userManager.add(req.body)
}
)

router.post("/signIn", async (req, res)=>{
    const {email, password} = req.body  
    if ( !email || !password){
        res.status(400).send({status: "error", error: "ingrese email y contraseña"})
        return
    }
    try {
        const user = await userManager.getByEmail(email)
        if (!user) {
            res.status(404).send({status: "error", error: "Usuario no encontrado"})
            return
        }
        const isPasswordValid = password === user.password
        if (!isPasswordValid){
            res.status(401).send({status: "error", error: "Contraseña incorrecta"})
            return
        }
        req.session.user= {email: user.email, first_name: user.first_name, last_name: user.last_name, cart: null}
        res.status(200).send({status: "success", user: req.session.user})
    } catch (error) {
        console.log(error)
        res.status(500).send({status: "error", error: error.message})   
    }
})

router.get("/signOut", async (req, res)=>{
    req.session.destroy()
    res.status(200).send({status: "success"})
})

export default router