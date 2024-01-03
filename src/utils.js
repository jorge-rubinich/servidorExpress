import { dirname, join } from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const __dirname = dirname(fileURLToPath(import.meta.url))

const hashData = async (data) => {
  return await bcrypt.hash(data, 10)
}

const compareData = async (data, hashedData) => {
  return await bcrypt.compare(data, hashedData);
}

const moneyFormat = (number) => {
  return new Intl.NumberFormat("es-ES").format(number);
}

const PRIVATE_KEY = "clave-secreta-del-token-1234567890"

/* Generate token */
const generateToken = (data) => {
  const token= jwt.sign(data, PRIVATE_KEY, { expiresIn: "1h" })
  return token
} 

/* Verify token */
const authToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    if (authHeader) {
      const token = authHeader.split(" ")[1]  // use split to remove the word 'Bearer' (Bearer <token> )
      if (token) {
        jwt.verify(token, PRIVATE_KEY, (err, user) => {
          if (err) {throw new err( "Token inválido")}
          req.user = user
          next()
        })
      } else {
        throw new err( "No se ha enviado el token")
      }
    } else {
      throw new err("No se ha enviado el token")
    }

  } catch (error) {
    next(error)    
  }
}


export { __dirname, hashData, compareData, generateToken, authToken, moneyFormat }