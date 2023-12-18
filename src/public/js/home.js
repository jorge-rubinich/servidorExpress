// home.js  en la carpeta public
// Path: src/public/js/home.js



async function addToCart(id) {
  // first get the cart id from the session
  try {
    const url = 'http://localhost:8080/api/carts/getCartId'
    const options = {
      method: 'GET',
    }
    await fetch(url, options)
      .then((response) => {
        // evaluate the API response
        console.log(Response.ok)
        if (!response.ok) throw new Error(response.error)
        return response.json()
      })
      .then((data) => {
        console.log("tengo carrito "+data.cartId)
        const cartId = data.cartId
        const url = 'http://localhost:8080/api/carts/' + cartId + '/product/' + id
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: 1 })
        }
        fetch(url, options)
          .then((response) => {
            // evaluate the API response
            if (!response.ok) throw new Error(response.error)
              Swal.fire({
              text: `El pruducto ha sido agregado al carrito!`,
              toast: true,
              icon: 'success',
              showConfirmButton: false,
              timer: 3000,
              position: "top-right",
          })
          })
      })
    } catch (error) {
      console.log(error)
      return false
    }

}