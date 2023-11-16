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
        if (!response.ok) throw new Error(response.error)
        return response.json()
      })
      .then((data) => {
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
          })
      })
    } catch (error) {
      console.log(error)
      return false
    }

}