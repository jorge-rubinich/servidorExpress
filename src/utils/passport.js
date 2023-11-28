import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GitHubStrategy } from 'passport-github2'
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20'    
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import userManager from '../dao/mongo/userMongoManager.js'
import {hashData, compareData} from '../utils.js'
import sysVars from '../config/index.js'

passport.use("register",
 new LocalStrategy(
    {passReqToCallback: true, usernameField: "email"},
    async (req, email, password, done) => {
    const {first_name, last_name} = req.body
    if (!first_name || !last_name || !email || !password){
        return done(null, false, {message: "ingrese todos los datos."})
    }
    try {   
        const userExist = await userManager.getByEmail(email)
        if (userExist){
            return done(null, false, {message: "El usuario ya existe."})
        }
        const createdUser = await userManager.add(
            {
            ...req.body,
            password: await hashData(password)
            }
        )
        if (!createdUser) {
            return done(null, false, {message: "El usuario no se pudo crear."})
        }
        return done(null, createdUser)
    } catch (error) {
        return done(error)
    }
    }
 ))
 
 passport.use("login",
    new LocalStrategy(
        {usernameField: "email"},
        async (email, password, done) => {
        if ( !email || !password){
            return done(null, false, {message: "ingrese email y contraseña."})
        }
        try {
            const user = await userManager.getByEmail(email)
            if (!user) {
                return done(null, false, {message: "Usuario o contraseña incorrecta++"})
            }
            const isPasswordValid = await compareData(password,user.password)
            if (!isPasswordValid){
                return done(null, false, {message: "Usuario o contraseña incorrecta**"})
            }
            done(null, user)

        } catch (error) {
            done(error)
        }
        }
    ))

passport.use("github",
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENTID,
            clientSecret: process.env.GITHUB_CLIENTSECRET,
            callbackURL: process.env.GITHUB_CALLBACKURL,
            scope: ["user:email"]  
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("git Profile:", profile)
            try {
                const user = await userManager.getByEmail(profile.emails[0].value)
                if (user) return done(null, user)
                const userCreated = await userManager.add({
                    first_name: profile.displayName,
                    last_name: profile.displayName,
                    email: profile.emails[0].value,
                    password: profile.id
                })
                done(null, userCreated)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.serializeUser((user, done) =>{
  done(null, user._id)
})

passport.deserializeUser(async (id, done) =>{
    try {
        const user= await userManager.getById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }

  })
