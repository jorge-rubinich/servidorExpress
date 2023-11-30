import exp from "constants"
import { Router } from "express"
import userManager from "../dao/mongo/userMongoManager.js"
import passport from "passport"
import { hashData, compareData } from "../utils.js"

const router = Router()

router.get("/current", (req, res) => {
   res.render("current", { user: req.session.user })
}	
)


router.post("/register",
    passport.authenticate("register",
        {
            failureRedirect: "/api/sessions/failRegister",
            failureFlash: true
        }),
    async (req, res) => {
        res.status(200).send({ status: "success", user: req.session.user })
    }
)

router.get("/failRegister", (req, res) => {
    const message = req.flash("error")
    res.status(401)
        .json({ status: "error", error: message })
}
)

// Login with mail and password
router.post("/login",
    passport.authenticate("login",
        {//successRedirect: "/api/sessions/successLogin", 
            failureRedirect: "/api/sessions/failLogin",
            failureFlash: true
        }),
    (req, res) => {
        req.session.user = req.user
        res.status(200).redirect('/');
    }
)

router.get("/successLogin",
    (req, res) => {
        req.session.user = req.user
        res.status(200).redirect('/');
    }
)

router.get("/failLogin",
    (req, res) => {

        const message = req.flash("error")[0]
        res.status(401)
            .json({ status: "error", error: message })
    }
)


router.get("/signOut", async (req, res) => {
    req.session.destroy()
    res.status(200).send({ status: "success" })
})


// Login with githubS
router.get("/github",
    passport.authenticate("github", { failureRedirect: "/api/sessions/failGithub" }),
    async (req, res) => { }
)

router.get("/githubcallback",
    passport.authenticate("github", { failureRedirect: "/api/sessions/failGithub" }),
    async (req, res) => {
        req.session.user = req.user
        res.status(200).redirect('/');
    })

router.get("/failGithub", (req, res) => {
    res.status(401).send({ status: "error", error: "Algo ha salido mal al registrarse" })
}
)


export default router