import { Router } from "express"
import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js"

const PORT = 8080
const app= express()
const router = new Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/static", express.static(__dirname + '/public'));

// routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.listen(PORT, ()=>{
    console.log("Escuchando en Puerto "+PORT)
    console.log("localhost:8080/products                      retorna todos los productos \n"+ 
"localhost:8080/products? limit=n             retorna los primeros n productos.\n"+
"localhost:8080/products/x                    retorna el producto id x\n"+
"localhost:8080/products/x1,..,xn             retorna todos los productos con las ids pedidas.")
})