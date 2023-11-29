import exp from "constants"
import {Router} from "express"
import userManager from "../dao/mongo/userMongoManager.js"
import passport from "passport"
import {hashData, compareData} from "../utils.js"

const router = Router()

router.post("/register",
    passport.authenticate("register", 
        {failureRedirect: "/api/sessions/failRegister"}),
    async (req, res)=>{
        res.status(200).send({status: "success", user: req.session.user}) 
    }
)

router.get("/failRegister", (req, res)=>{
    res.status(401).send({status: "error", error: "Algo ha salido mal al registrarse"})
    }
)
//,

router.get("/login", 
    passport.authenticate("login",
        {successRedirect: "/", 
        failureRedirect: "/api/sessions/failLogin",       
        failureFlash: true})
)


router.get("/failLogin", 
    (req, res)=> {
        const message = req.flash("error")
        res.status(401)
        .json({status: "error", error: message})
    }
)

router.get("/signOut", async (req, res)=>{
    req.session.destroy()
    res.status(200).send({status: "success"})
})

router.get("/github",
    passport.authenticate("github", {failureRedirect: "/api/sessions/failGithub"}),
    async (req, res)=>{}
)

router.get("/githubcallback",
    passport.authenticate("github", {failureRedirect: "/api/sessions/failGithub"}),
    async (req, res)=>{
        const {email, first_name, last_name} = req.user
        const admin = email==="adminCoder@coder.com"? true : false
        req.session.user= {email, first_name, last_name, cart: null, admin}
        res.status(200).redirect('/');
    }  ) 

router.get("/failGithub", (req, res)=>{
    res.status(401).send({status: "error", error: "Algo ha salido mal al registrarse"})
    }
)

    
export default router