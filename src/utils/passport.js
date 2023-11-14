import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import userModel from '../db/models/users.model.js'
import {hashData} from '../utils.js'


passport.use("signup",
 new LocalStrategy(
    {passReqToCallback: true, usernameField: "email"},
    async (req, email, password, done) => {
//    const {first_name, last_name, email, password} = req.body
    if (!first_name || !last_name || !email || !password){
        done(null, false)
    }
    try {   
        const hasedPassword = await hashData(password)
        const createdUser = await userModel.createOne({
            ...req.body,
            password: hasedPassword
        })
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
    }
 ))
 
 passport.use("login",
    new LocalStrategy(
        {usernameField: "email"},
        async (email, password, done) => {
        if ( !email || !password){
            done(null, false)
        }
        try {
            const user = await userModel.getByEmail(email)
            if (!user) {
                done(null, false)
            }
            const isPasswordValid = await compareData(password,user.password)
            if (!isPasswordValid){
                done(null, false)
            }
            done(null, user)
        


        } catch (error) {
            done(error)
        }
        }
    ))

function serializeUser(user, done) {
  done(null, user._id);
}   

async function deserializeUser(id, done) {   
    try {
        user = await userModel.findById(id)
        done(null, user);
    } catch (error) {
        done(error, null)
    } 

  }