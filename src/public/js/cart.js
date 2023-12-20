
async function deleteCart(id) {
    response= await fetch('/api/carts/'+id, {
        method: 'DELETE',
    }) .then((response)=>{
       if (response.status===200) {
            Swal.fire({
                text: `El carrito ha sido vaciado correctamente.`,
                toast: true,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
                position: "top-right",
            })
        return 
      } else {
        Swal.fire({
            text: `Ha ocurrido un error al vaciar el carrito.`,
            toast: true,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000,
            position: "top-right",
          })
      }
    })
}  


// falta.. revisar
async function removeProduct(id) {
    // first get the cart id from the session
    try {
        const url = 'http://localhost:8080/api/carts/getCartId'
        const options = {
          method: 'GET',
        }
        await fetch(url, options)
          .then((response) => {
            // evaluate the API response
            if (!response.ok) throw new Error(response.error)
            return response.json()
          })
          .then((data) => {
            console.log("tengo carrito "+data.cartId)
            const cartId = data.cartId
            const url = 'http://localhost:8080/api/carts/' + cartId + '/product/' + id
            const options = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            }
            fetch(url, options)
              .then((response) => {
                // evaluate the API response
                if (!response.status===200) throw new Error(response.error)
              })
          })
        } catch (error) {
          return false
        }
        await Swal.fire({
            text: `El pruducto ha sido eliminado del carrito.`,
            toast: true,
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            position: "top-right",
        })
        location.reload(true)
    }

