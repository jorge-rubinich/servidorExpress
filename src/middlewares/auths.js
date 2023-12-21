

const auth = (...rolesAllowed)=> { 
    return (req, res, next) => {
        if (rolesAllowed.includes(req.session.user.role)){
            next()
        } else {
            res.status(403).send({status: "error", message: "No tiene permisos para realizar esta acción"})
        }
    }
}