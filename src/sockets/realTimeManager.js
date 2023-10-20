import manager from "../managers/productManager.js"

function realTimeManager(io, socket) {
  
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