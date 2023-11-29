import { Router } from "express"
import express from "express"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import sessionRouter from "./routes/sessions.router.js" 
import usersRouter from "./routes/users.router.js"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import socketServer from "./sockets/socketServer.js"
import sysVars from "./config/index.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import flash from "express-flash"
import "./utils/passport.js"
import passport from "passport"

const {PORT} = sysVars.app
const {URI} = sysVars.database
const connectDB = sysVars.connectDB

connectDB(URI)

const app= express()
const router = new Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Error");
   });

// Set session
app.use(session({
    store: new MongoStore({mongoUrl: URI}),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 600000},
}))

// Set passport
app.use(passport.initialize())  
app.use(passport.session())
app.use(flash())


// Set handlebars
app.engine("handlebars", handlebars.engine({}))
app.set("views", __dirname + "/views/")
app.set("view engine", "handlebars")

// routes


 
app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionRouter)
app.use("/api/users", usersRouter)

const httpServer = app.listen(PORT, ()=>{
    console.log("Escuchando en Puerto "+PORT)})


socketServer.createSocketServer(httpServer)
    

