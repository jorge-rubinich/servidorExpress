import fs from "fs"
const path = "productos.json"

class ProductManager {

    static lastProductId = 0

    static nuevoId (lastId){
        ProductManager.lastProductId= lastId || ProductManager.lastProductId+1 
        return ProductManager.lastProductId
    }

    constructor(path) {
        this.path=path
        this.products = []
    }
    
    async retreiveProducts() {
        let products = []
        if (fs.existsSync(this.path)){
           const content = await fs.promises.readFile(this.path)
           products = JSON.parse(content)
        } 
        ProductManager.nuevoId(products.length ? products[products.length-1].id : 0)
        return products
      }


    async saveProducts(products) {
        const content = JSON.stringify(products);
        fs.promises.writeFile(this.path, content);
    }

    async addProduct(newProduct) {
        // Add the given product to the list of products
        const code = newProduct.code
        if (code===undefined || !typeof code==="string" || !code.length===5) { 
            return "El producto debe contar con un código de producto válido."
        }
        this.products = await this.retreiveProducts()
        const validation = this.products.find(prod => prod.code == code)
        if (validation) {
            return {status: "error", error: "El producto con código "+code+" ya existe."}
        } else {
            newProduct.id =  ProductManager.nuevoId()
            this.products.push(newProduct)
            await this.saveProducts(this.products)
        } 
        return {status: "success", message: "Product added"}
    }

    async updateProduct(idToUpdate, updatesObj) {
        // Update the product with the given id with the given product
        this.products = await this.retreiveProducts()
        const index = this.products.findIndex(element => element.id == idToUpdate)
        if (index===-1) { return "El producto con id "+idToUpdate+" no existe."}
        
        const originalProduct = this.products[index]
        for (let key in originalProduct) {
            if (!(updatesObj[key]===undefined ||key==="id")) {
                originalProduct[key] = updatesObj[key]
            }
        }
        this.products[index] = originalProduct
        await this.saveProducts(this.products)
        return originalProduct
    }

    async deleteProduct(id) {
        this.products = await this.retreiveProducts()
        const prodToDelete = this.products.find(prod => prod.id ==id)
        if (prodToDelete) {
            // delete the product
            this.products = this.products.filter(prod => prod.id != id)
            await this.saveProducts(this.products)
        }
        return prodToDelete
    }  

    async getProductById(id) {
        // Return the product(s) with the given id(s)
        this.products = await this.retreiveProducts()
        const idArray= id.split(",")
        if (idArray.length==1) {
            // have an only id
            const searchedCode = this.products.find(prod => prod.id ==id)
            return searchedCode
        }else {
            // have more than one id.
            const prodArray= idArray.map( id => {
                const searchedCode = this.products.find(prod => prod.id ==id)
                
                return searchedCode? searchedCode : { id:  +id, error: "Id "+id+" not found"}
            } )
            return prodArray 
        }     
    }

    async getProducts(queryObj) {
        // return the complete set of products, or the given amount (if 'limit' is in the query)
        const {limit} = queryObj
        this.products = await this.retreiveProducts();
        return this.products.slice(0, limit)
    }

}

const manager = new ProductManager(path)

export default manager

