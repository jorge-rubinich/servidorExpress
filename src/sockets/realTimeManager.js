import manager from "../managers/productManager.js"

function realTimeManager(io, socket) {

    async function newUser(data) {
      // received by new user
      messageLogs= await chatModel.find().sort({'createdAt': -1}).limit(chatLimit)
      messageLogs.reverse()
      socket.emit("chat-started", messageLogs);
      // receiver by all except new user
      socket.broadcast.emit("user-logged-in", data);
    }
  
    async function getProducts(data) {
        const products = await manager.getProducts({})
        io.emit("products", products)
    }

    async function productUpdate(data) {
        const products = await manager.getProducts({})
        io.emit("products", products)
    }
  
    socket.on("getProducts", getProducts)  
    socket.on("update", productUpdate)
  }
  
  export default realTimeManager