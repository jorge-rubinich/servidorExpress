// chat.js
//  in front-End

console.log('Socket')
const socket = io()
let myUser
const chatArea = document.getElementById('messages')
document.getElementById('sendMsgButton').addEventListener('click', function() {
  var message = document.getElementById('messageArea').value
  if (message === "") return
  socket.emit('newMessage', {user: myUser, message}); 
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
  msgLog= ""
  console.log(msgHistory)
  msgHistory.forEach(message => { 
      msgLog += `
      <li>
        ${(message.user===myUser)? "__________":""}
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

    ${(data.user===myUser)? "__________":""}
    <strong>${data.user} dice</strong>: ${data.message}
  </li>
  `
}) 

document.addEventListener('DOMContentLoaded', function() {
  var emailInput = document.getElementById('email')
  var chatButton = document.querySelector('[data-bs-target="#chat"]')
  chatButton.disabled = true

  emailInput.addEventListener('input', function() {
      var email = emailInput.value
      var isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Simple email validation

      chatButton.disabled = !isValidEmail
      })

  chatButton.addEventListener('click', function() {
      myUser = emailInput.value
      socket.emit('newUser', myUser)
      })
     })




