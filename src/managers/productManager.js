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
        console.log(code)
        if (code===undefined || !typeof code==="string" || !code.length===5) { 
            return "El producto debe contar con un código de producto válido."
        }
        this.products = await this.retreiveProducts()
        const validation = this.validProduct(newProduct)
        if (validation===undefined) {
            newProduct.id =  ProductManager.nuevoId()
            this.products.push(newProduct)
            await this.saveProducts(this.products)
        } 
        return validation
    }

 
    async updateProduct(idToUpdate, updatesObj) {
        // Update the product with the given id with the given product
        this.products = await this.retreiveProducts()
        const index = this.products.findIndex(element => element.id == idToUpdate)
        if (index===-1) { return "El producto con id "+idToUpdate+" no existe."}
        // validate the object with updates
        const validation = this.validProduct(updatesObj, "update")
        if (validation===undefined) {
            // validation is undefined -> no errors
            const originalProduct = this.products[index]
            for (let key in originalProduct) {
                if (!(updatesObj[key]===undefined ||key==="id")) {
                    originalProduct[key] = updatesObj[key]
                }
               }
            this.products[index] = originalProduct
            await this.saveProducts(this.products)
        } 
        return validation
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


    validProduct(prodToVerify, mode="add") {
        let returnValue= true
        let logMessage= "Se han encontrado los siguientes errores: \n"
        
        // Evaluate if code exist in the products array
        const codeExist= this.products.find(prod => prod.code ==prodToVerify.code)
        if (!(codeExist===undefined)) {
           // retornar error El codigo existe
           logMessage+= "- El codigo "+prodToVerify.code+" ya existe.\n"
           returnValue=false
        }
        // evaluate if title is empty or undefined
        if (!prodToVerify.title || prodToVerify.title.length==0 || !typeof prodToVerify.title==="string") {
            if (mode="add"){
                logMessage+= "- No ha especificado el titulo (title) del producto.\n"
                returnValue=false
            }
        }
        
        // evaluate if description is empty or undefined
        if (!prodToVerify.description || prodToVerify.description.length==0 || !typeof prodToVerify.description==="string") {
            if (mode="add"){
                logMessage+= "- No ha especificado la descripcion (description) del producto.\n"
                returnValue=false
            }
        }
        
        // have a thunbnails key but is not an array
        if (prodToVerify.thumbnails || !Array.isArray(prodToVerify.thumbnails)) {
            // thumbnails is undefined o is not an array
            logMessage+= "- No ha especificado thumbnails como un arreglo de URLS de imágenes.\n"
            returnValue=false
        }
        
        if (!prodToVerify.code) {
            logMessage+= "- No ha especificado el código (code) del producto.\n"
            returnValue=false
        }
        
        // evaluo si price es undefined  
        if (prodToVerify.price===undefined) {
            logMessage+= "- No ha especificado el precio (price) del producto.\n"
            returnValue=false
        }
        // evaluo si stock esta vacio
        if (prodToVerify.stock===undefined) {
            logMessage+= "- No ha especificado el stock del producto.\n"
            returnValue=false
        }
        return returnValue? undefined : logMessage
    }
}

const manager = new ProductManager(path)

export default manager

