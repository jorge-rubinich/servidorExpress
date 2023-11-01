// chat.js
//  in front-End

console.log('Socket')
const socket = io()
let myUser
const messageLog = document.getElementById('messages')

document.querySelector('.chatbox button').addEventListener('click', function() {
  var message = document.querySelector('.chatbox input[type="text"]').value;
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
        ${(message.user===user)? "__________":""}
        <strong>${message.user} dice</strong>: ${message.message}
      </li>
      `
  });

  messageLog.innerHTML = msgLog
})


socket.on("message", (data) => {
  messageLog.innerHTML += `
  <li>

    ${(data.user===user)? "__________":""}
    <strong>${data.user} dice</strong>: ${data.message}
  </li>
  `
}) 


Swal.fire({
    title: 'Ingresa tu correo electrónico:',
    input: 'email', 
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
  })
  .then((result) => {
    if (result.isConfirmed) {
        myUser = result.value
        socket.emit('newUser', myUser)
    } else
    {
        window.location.href = "/"
    }
  })

// get the session.user to use the username in the chat
/* fetch('/api/session/datos-sesion')
  .then(response => response.json())
  .then(data => {
    // Access data session in the client and 
    // use email as the username
    user = data.userSession.email 
    socket.emit('new-user', user)
  })
  .catch(error => {
    console.log('Error:', error);
  }); */





/* chatbox.addEventListener('keyup', evt => {
    if (evt.key==='Enter') {
        if (chatbox.value.trim().length>0) {
            socket.emit('new-message', {
                user, message: chatbox.value
            })
            chatbox.value=''
        }
    }
})

*/
