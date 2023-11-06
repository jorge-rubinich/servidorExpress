// home.js  en la carpeta public
// Path: src/public/js/home.js

const socket = io()
let myUser
const chatArea = document.getElementById('messages')
document.getElementById('sendMsgButton').addEventListener('click', function () {
  var message = document.getElementById('messageArea').value
  if (message === "") return
  socket.emit('newMessage', { user: myUser, message })
});

socket.on("userLogged", (user) => {
  if (user === myUser) return
  Swal.fire({
    text: `${user} se ha unido al chat!`,
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    position: "bottom-left",
  })
})

socket.on("chatStarted", (msgHistory) => {
  msgLog = ""
  console.log(msgHistory)
  msgHistory.forEach(message => {
    msgLog += `
      <li>
        ${(message.user === myUser) ? "__________" : ""}
        <strong>${message.user} dice</strong>: ${message.message}
      </li>
      `
  })
  chatArea.innerHTML = msgLog
})


socket.on("message", (data) => {
  chatArea.innerHTML += `
  <li>

    ${(data.user === myUser) ? "__________" : ""}
    <strong>${data.user} dice</strong>: ${data.message}
  </li>
  `
})

async function addToCart(id) {
  try {
    const url = 'http://localhost:8080/api/carts/' + id
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: 1 })
    }
    await fetch(url, options)
      .then((response) => {
        // evaluate the API response
        if (!response.ok) throw new Error(response.error)
      })
  } catch (error) {
    console.log(error)
    return false

  }
  return true

}

document.addEventListener('DOMContentLoaded', function () {
  const chatForm = document.getElementById('chatForm')
  const emailInput = document.getElementById('email')
  const chatButton = document.querySelector('[data-bs-target="#chat"]')
  chatButton.disabled = true

/*   emailInput.addEventListener('input', function () {
    var email = emailInput.value
    var isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Simple email validation

    chatButton.disabled = !isValidEmail
  }) */

  chatForm.addEventListener("pointerenter", function () {
    var email = emailInput.value
    var isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Simple email validation

    chatButton.disabled = !isValidEmail
  })

  chatButton.addEventListener('click', function () {
    myUser = emailInput.value
    socket.emit('newUser', myUser)
  })
})



