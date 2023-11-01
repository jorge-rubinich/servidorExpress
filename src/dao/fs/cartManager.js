import fs from "fs"
const path = "carts.json"

class CartManager {

    static lastCartId = 0

    static nuevoId (lastId){
        CartManager.lastCartId++ 
        return CartManager.lastCartId
    }

    constructor(path) {
        this.path=path
        this.carts = []

    }
    
    async retreiveCarts() {
        let carts = []
        try {
            if (fs.existsSync(this.path)){
                const content = await fs.promises.readFile(this.path)
                carts = JSON.parse(content)
             } 
             CartManager.lastCartId = carts.length ? carts[carts.length-1].id : 0
             return carts
        } catch (error) {
            throw new Error("Error reading carts file: "+error.message)
        }

    }


    async saveCarts(carts) {
        try {
            const content = JSON.stringify(carts);
            fs.promises.writeFile(this.path, content);
        } catch (error) {
            throw new Error("Error saving carts file: "+error.message)
        }

    }

    async addCart() {
        // Add the given product to the list of carts
        this.carts = await this.retreiveCarts()
        const newCart={
            id :  CartManager.nuevoId(), 
            products: []
        }
        this.carts.push(newCart)
        await this.saveCarts(this.carts)
        return newCart
    }

 
    async addProduct(cartId, productId) {
        // validate the cart exists
        const cart = await this.getCartById(cartId)
        if (!cart) { throw new Error("Not found cart with id "+cartId)}
        // add the product to the cart Products array
        const index = cart.products.findIndex(element => element.id == productId)
        if (index===-1) {
            cart.products.push({id: productId, quantity: 1})
        } else {
            cart.products[index].quantity++
        }
        // save the cart
        await this.saveCarts(this.carts)
        return cart
    }



    async getCartById(id) {
        // Return the cart with the given id
        this.carts = await this.retreiveCarts()
        const cart = this.carts.find(prod => prod.id ==id)
        return cart
    }
        


}

export const manager = new CartManager(path)