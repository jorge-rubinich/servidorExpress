import { Router } from "express"
import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import socketServer from "./sockets/socketServer.js"


const PORT = 8080
const app= express()
const router = new Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));


// Set handlebars
app.engine("handlebars", handlebars.engine({}))
app.set("views", __dirname + "/views/")
app.set("view engine", "handlebars")

// routes
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

const httpServer = app.listen(PORT, ()=>{
    console.log("Escuchando en Puerto "+PORT)})


socketServer.createSocketServer(httpServer)
    

/* IoServer.on("connection", async (socket)=>{
    console.log("Nuevo cliente conectado!")
    const products = await manager.getProducts({})
    socket.emit("products", products)
    
    socket.on("update", async (data)=>{
        const products = await manager.getProducts({})
        socket.emit("products", products)
    }) */


