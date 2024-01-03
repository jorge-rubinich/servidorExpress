import { generateToken, authToken } from "../utils.js"

const getCurrent = async (req, res) => {
    res.render("current", { user: req.session.user })
 }

const register = async (req, res) => {
    const accessToken = generateToken(req.user)
    res.status(200).send({ status: "success", accessToken })
}

const failRegister = async (req, res) => {
    const message = req.flash("error")
    res.status(401)
        .json({ status: "error", error: message })
}

const login = (req, res) => {
    // the strategy return the user in req.user
    const accessToken = generateToken(req.user)    
    res.status(200).send({ status: "success", accessToken })      
}

const successLogin = async (req, res) => {
    console.log("successLogin en session.controller.js")
    res.status(200).redirect('/')
}

const failLogin = async (req, res) => {
    const message = req.flash("error")[0]
    res.status(401)
        .json({ status: "error", error: message })
}

const signOut= async (req, res) => {
    req.session.destroy()
    res.status(200).send({ status: "success" })
}

const githubcallback=     async (req, res) => {
    const accessToken = generateToken(req.user)    
    res.status(200).send({ status: "success", accessToken }).redirect('/')
}

const failGithub= (req, res) => {
    res.status(401).send({ status: "error", error: "Algo ha salido mal al registrarse" })
}

export { getCurrent, register, failRegister, login, successLogin, 
         failLogin, signOut, githubcallback, failGithub }