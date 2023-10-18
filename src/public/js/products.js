// define the function to delete a product
async function deleteProduct(id) {
    var deleteConfirmed = false
    await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) deleteConfirmed = true
    })

    if (!deleteConfirmed) return false

    try {
        const url= 'http://localhost:8080/api/products/'+id
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await fetch(url, options)
        .then((response)=>{
            // evaluate the API response
            if (!response.ok) throw new Error(response.message.error)
            console.log('Producto eliminado')
        })
    } catch (error) {
                
    }
    return true

}


// define the function to change the price of a product
async function changePrice(id, oldPrice) {
    var newPrice = oldPrice
    await Swal.fire({
        title: 'Ingresa el nuevo precio',
        input: 'text',
        inputValue: oldPrice,
        showCancelButton: true,
        inputValidator: (value) => {
            if  (!value || value == oldPrice) {
                return false
            } 
        }
    }).then((response) => {
        if (response.isConfirmed) {
            newPrice = response.value;
        }
    })

    // if newPrice is different from oldPrice, update the product. If not, return
    if (newPrice == oldPrice) return false
    try {
        const url= 'http://localhost:8080/api/products/'+id
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({price: newPrice})
        }
        await fetch(url, options)
        .then((response)=>{
            // evaluate the API response
            if (!response.ok) throw new Error(response.error)
        })
    } catch (error) {
        console.log(error)
        return false
                
    }
    return true
    
}

async function handleImageClick(event){
    //verify if the click was on a product action
    if (event.target.classList.contains('productAction')) {
        var mustUpdateSocket = true
        //get the id of the product
        const productId = event.target.getAttribute('data-product-id')
        //redirect to the apropiate function
        if (event.target.classList.contains('productDelete')) {
            mustUpdateSocket= await deleteProduct(productId)
            if (mustUpdateSocket) {
                // update the socket
                socket.emit('update', 'delete')
            }
        } else if (event.target.classList.contains('productPriceChange')) {
            const currentPrice = event.target.getAttribute('data-product-price')
            mustUpdateSocket= await changePrice(productId, currentPrice)
            if (mustUpdateSocket) {
                // update the socket
                socket.emit('update', 'priceChange')
            }
        }
    }
}


async function addProduct(e) {
    e.preventDefault()
    console.log("entre a AddProduct")
    const formTitle = document.getElementById("formTitle")
    const formDescription = document.getElementById("formDescription")
    const formPrice = document.getElementById("formPrice")
    const formThumbnail = document.getElementById("formThumbnail")
    const formCode = document.getElementById("formCode")
    const formStock = document.getElementById("formStock")
    const formCategory = document.getElementById("formCategory")

    const title = formTitle.value
    const description = formDescription.value
    const price = formPrice.value
    const thumbnail = formThumbnail.value
    const code = formCode.value
    const stock = formStock.value
    const category = formCategory.value

    try {
        const url= 'http://localhost:8080/api/products/'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({price, title, description, thumbnail, code, stock, category, status: true})
        }
        await fetch(url, options)
        .then((response)=>{
            // evaluate the API response
            console.log(response)
            console.log(response.error)
            if (!response.ok) throw new Error(response.errors)
        })
    } catch (error) {
        console.log(error)
        return false
                
    }
    socket.emit('update', 'add')
}

function createCard(product) {
    const card = document.createElement('div')  
    card.classList.add('col-lg-4', 'col-md-6', 'col-sm-12')
    card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${product.thumbnails}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
            <div>
            <div style="display: flex; justify-content: space-between">
                <div><b>$${product.price}</b></div>
                <div style="background-color: #ffffff; color: #ffffff; padding: 5px; border-radius: 5px; width: 50px; cursor: pointer">
                    <img src="/imgs/delete.svg" alt="Eliminar producto"  data-product-id="${product.id}" class="productAction productDelete">
                </div>
                <div style="background-color: #ffffff; color: #ffffff; padding: 5px; border-radius: 5px; width: 50px; cursor: pointer">
                    <img src="/imgs/price_change.svg" alt="cambiar precio del producto" data-product-id="${product.id}" data-product-price="${product.price}" class="productAction productPriceChange">
                </div>
            </div>


        </div>`

    return card
}



// Asociate the clic to capture the click on the SVG images
document.addEventListener('click',handleImageClick)
const addForm = document.getElementById("addForm");

addForm.onsubmit = addProduct

const socket = io()
socket.emit('getProducts')   
socket.on('products', (products)=>{
    // show the product list
    const productsList = document.getElementById('productCards')
    productsList.innerHTML = ''
    products.forEach(product => {
        const card= createCard(product)
        productsList.appendChild(card)
    })
})
