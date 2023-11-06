// home.js  en la carpeta public
// Path: src/public/js/home.js

const socket = io()
let myUser
const chatArea = document.getElementById('messages')
document.getElementById('sendMsgButton').addEventListener('click', function () {
  var message = document.getElementById('messageArea').value
  if (message === "") return
  socket.emit('newMessage', { user: myUser, message });
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
  });

  console.log(msgLog)
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

async function clickHandle(event) {
  //verify if the click was on a buy product Button
  if (event.target.classList.contains('buyButton')) {
    //get the id of the product
    const productId = event.target.getAttribute('data-product-id')
    //find the cart id for the user

    const url = 'http://localhost:8080/carts/' + productId
  }
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

document.addEventListener('click', clickHandle)


