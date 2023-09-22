import fs from "fs"
const path = "productos.json"

class ProductManager {

    static productCount = 0

    static nuevoId (){
        return ProductManager.productCount+=1
    }

    constructor(path) {
        this.path=path
        this.products = []
        this.lastProductId=0
    }
    


    async retreiveProducts() {
        let products = []
        if (fs.existsSync(this.path)){
           const content = await fs.promises.readFile(this.path)
           products = JSON.parse(content)
        } else {
        }
        this.lastProductId = products.length ? products[products.length-1].id : 0
        return products
      }


    async saveProducts(products) {
        const content = JSON.stringify(products);
        fs.promises.writeFile(this.path, content);
    }

    async addProduct(prodToAdd) {
        this.products = await this.retreiveProducts();
        if (this.validProduct(prodToAdd)) {
            //ProductCount+=1;
            let newProduct = prodToAdd
            newProduct.id =  ProductManager.nuevoId()
            // agregar el producto
            this.products.push(newProduct)
            // console.log(this.products)
            await this.saveProducts(this.products)
            console.log("El codigo ",newProduct.code," fue agregado exitosamente.");

        }
    }
    
    validProduct(prodToVerify) {
        let returnValue= true
        let logMessage= "Se han encontrado los siguientes errores: \n"
        
        // Evaluo si el codigo existe.
        const codeExist= this.products.find(prod => prod.code ==prodToVerify.code);
        if (!(codeExist===undefined)) {
           // retornar error El codigo existe
           logMessage+= "- El codigo "+prodToVerify.code+" ya existe.\n"
           returnValue=false
        }
        // evaluo si title esta vacio o undefined
        if (!prodToVerify.title) {
            logMessage+= "- No ha especificado el titulo (title) del producto.\n"
            returnValue=false
        }
        // evaluo si descripcion esta vacio o undefined
        if (!prodToVerify.description) {
            logMessage+= "- No ha especificado la descripcion (description) del producto.\n"
            returnValue=false
        }
        // evaluo si thumbnail esta vacio o undefined
        if (!prodToVerify.thumbnail) {
            // Personalemente usaria valor por defecto "Sin imagen", pero ordenes son ordenes...
            logMessage+= "- No ha especificado el archivo de imagen (thumbnail) del producto.\n"
            returnValue=false
        }
        // evaluo si code esta vacio o undefined
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
        returnValue || console.log(logMessage)
        return returnValue
    }

    async getProductById(id) {
        // Return the product(s) with the given id(s)
        this.products = await this.retreiveProducts();
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

export const manager = new ProductManager(path)