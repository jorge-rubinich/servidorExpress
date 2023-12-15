//import { Router } from "express"
import router from "./routes/index.js"
import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
//import socketServer from "./sockets/socketServer.js"
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
app.use("/", router)

const httpServer = app.listen(PORT, ()=>{
    console.log("Escuchando en Puerto "+PORT)
    console.log("para el tutor:  Migrando a patron Repository. NO CORREGIR")
})


//socketServer.createSocketServer(httpServer)
    

