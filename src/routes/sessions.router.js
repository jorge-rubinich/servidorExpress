import { Router } from "express"
import * as sessionController from "../controllers/session.controller.js"
import passport from "passport"
import { hashData, compareData } from "../utils.js"

const router = Router()

const registerOptions= {failureRedirect: "/api/sessions/failRegister", failureFlash: true}
const loginOptions= {failureRedirect: "/api/sessions/failLogin", failureFlash: true}

router.get("/current", 	sessionController.getCurrent)
router.post("/register", passport.authenticate("register", registerOptions),
                         sessionController.register)
router.get("/failRegister", sessionController.failRegister)
router.post("/login", passport.authenticate("login", loginOptions),
                        sessionController.login)
router.get("/successLogin", sessionController.successLogin)
router.get("/failLogin",sessionController.failLogin)
router.get("/signOut", sessionController.signOut)
router.get("/github",
    passport.authenticate("github", { failureRedirect: "/api/sessions/failGithub" }),
    async (req, res) => { }
)
router.get("/githubcallback",
    passport.authenticate("github", { failureRedirect: "/api/sessions/failGithub" }),
    sessionController.githubcallback
)
router.get("/failGithub", sessionController.failGithub)


export default router