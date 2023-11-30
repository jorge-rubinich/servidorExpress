// main.j 

//import { response } from "express"

async function signIn() {
    event.preventDefault()
    Swal.fire({
      title: 'Iniciar sesión',
      html:
        '<input id="log-email" class="swal2-input" placeholder="Correo electrónico">' +
        '<input id="log-password" type="password" class="swal2-input" placeholder="Contraseña">'+
        '<hr><a href="/api/sessions/github" class="btn btn-secondary btn-block"><i class="fab fa-github"></i> Iniciar sesión con Github</a>',
      showCancelButton: true,
      confirmButtonText: 'conectar',
      cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: async () => {
        const email = Swal.getPopup().querySelector('#log-email').value
        const password = Swal.getPopup().querySelector('#log-password').value
        const response=   await fetch('/api/sessions/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'content-type': 'application/json' }
        })
        
        if (!response.ok){
          const responseError= await response.json()
          console.log(responseError.error)
          Swal.showValidationMessage(responseError.error)
        } 
      }
    })
    href="/"
  }
  
  async function signUp() {
    event.preventDefault()
     Swal.fire({
      title: 'Registrate',
      html:
        '<input id="first_name" class="swal2-input" placeholder="Nombre">' +
        '<input id="last_name" class="swal2-input" placeholder="Apellido">'+
        '<input id="email" class="swal2-input" placeholder="Correo electrónico">' +
        '<input id="password" type="password" class="swal2-input" placeholder="Contraseña">'+
        '<inpt id="age" class="swal2-input" placeholder="Edad">',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      focusConfirm: false,
      preConfirm: async () => {
        const first_name = Swal.getPopup().querySelector('#first_name').value
        const last_name = Swal.getPopup().querySelector('#last_name').value
        const email = Swal.getPopup().querySelector('#email').value
        const password = Swal.getPopup().querySelector('#password').value
        const age = Swal.getPopup().querySelector('#age').value
  
        return await fetch('/api/sessions/register', {
          method: 'POST',
          body: JSON.stringify({first_name, last_name, email, password, edad}),
          headers: {'content-type': 'application/json'}
        }) .then((response)=>{
          console.log(response)
           // if !ok . .
          if (!response.ok) { 
            return response.json()
            .then((response)=>{
              throw new Error(response.error)})
          }
             Swal.fire({
              text: `Usuario ${email} creado correctamente. Ahora inicia sesión para comprar.`,
              toast: true,
              background: '#9fdf9f',
              showConfirmButton: false,
              timer: 3000,
              position: "top-right",
            })
        }).catch(error =>{
          Swal.showValidationMessage(error.message+" "+error.linenumber)
        })
      }})
    }


    async function signOut() {
        response= await fetch('/api/sessions/signOut', {
            method: 'GET',
        }) .then((response)=>{
            if (response.ok) {
                window.location.href = "/"
            }
            }   
        )

    }

    async function goToCart() {
        response= await fetch('/api/carts/getCartId', {
            method: 'GET',
        }) .then((response)=>{
           if (response.ok) {
            return response.json()
          }
        })
          .then((data) => {
            if (!data.cartId) {
                Swal.fire({
                    text: `No hay productos aun en el carrito. Pero tenemos muchas ofertas para vos!`,
                    toast: true,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                    position: "top-right",
                  })
            } else {
              window.location.href = "/cart/"+data.cartId
            }
            })
            }   



        
