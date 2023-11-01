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
      connectDB: (URI)=>{
        mongoose.connect(URI)
        .then(()=>console.log("Conectado a la base de datos"))
        .catch((err)=>console.log(err))
        },
      persistence: process.env.PERSISTENCE
}

export default sysVars