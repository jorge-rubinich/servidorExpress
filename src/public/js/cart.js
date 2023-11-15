
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