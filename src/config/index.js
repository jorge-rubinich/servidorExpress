import {} from 'dotenv/config'
import {mongoose} from 'mongoose'

const sysVars = {
    app: {
        PORT: process.env.SERVER_PORT || 8080,
        HOST_URL:  process.env.HOST_URL 
    },
    database: {
        protocol: process.env.DATABASE_PROTOCOL,
        URI: process.env.MONGO_URL,
    },   
    github: {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL,
        scope: ["user:email"]  
    },
    connectDB: (URI)=>{
        mongoose.connect(URI)
        .then(()=>console.log("Conectado a la base de datos"))
        .catch((err)=> {
          console.log("ERROR:  No se pudo conectar a la base de datos ")
          })
    },
    persistence: process.env.PERSISTENCE
}

export default sysVars