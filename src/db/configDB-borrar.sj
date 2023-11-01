import mongoose from "mongoose"

mongoose.connect(URI)
  .then(()=>{console.log("Conectado a Base de Datos")})
  .catch((error)=>console.log(error))