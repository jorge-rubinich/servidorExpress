const getCurrent = async (req, res) => {
    res.render("current", { user: req.session.user })
 }

const register = async (req, res) => {
    res.status(200).send({ status: "success", user: req.session.user })
}

const failRegister = async (req, res) => {
    const message = req.flash("error")
    res.status(401)
        .json({ status: "error", error: message })
}

const login = (req, res) => {
    console.log("login")
    console.log(req.session.user)
    res.status(200).send({ status: "success", user: req.session.user })      
}

const successLogin = async (req, res) => {
    req.session.user = req.user
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
    req.session.user = req.user
    res.status(200).redirect('/');
}

const failGithub= (req, res) => {
    res.status(401).send({ status: "error", error: "Algo ha salido mal al registrarse" })
}

export { getCurrent, register, failRegister, login, successLogin, 
         failLogin, signOut, githubcallback, failGithub }