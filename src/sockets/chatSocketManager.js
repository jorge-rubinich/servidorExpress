import manager from "../dao/mongo/chatMongoManager.js"

function chatManager(io, socket) {
  
    async function haveNewUser(user) {
        console.log(user)
        // io.emit() is used to send a message to all connected clients
        io.emit("userLogged", user)
        const messages = await manager.getAll({})
        // socket.emit() is used to send a message to the client that sent the original message
        socket.emit("chatStarted", messages) 
    }
 
    async function haveNewMessage(data) {
        const result = await manager.add(data)
        io.emit("message", data)
    }
  
    socket.on("newUser", haveNewUser)
    socket.on("newMessage", haveNewMessage)
  }
  
  export default chatManager