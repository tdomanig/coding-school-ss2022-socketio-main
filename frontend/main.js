
/**
 * @constant
 * @type {import('socket.io/dist/socket').Socket}
 * @default
 */
const socket = io()
const chatPrint=document.getElementById('chat-history')
const nicknameInput = document.getElementById('user-nickname')
const sendMessageInput = document.getElementById('send-message')
const NewUser= document.getElementById('Newuser')
const PW= document.getElementById('newPassword')
const confirmPW= document.getElementById('confirmPassword')
const userPw= document.getElementById('user-password')
const onlineDisplay = document.getElementById('online-count')
const loggedInDisplay = document.getElementById('logged-in-count')
const serverMessages = document.getElementById('server-messages')
const messagebut=document.getElementById('send-message-btn')

messagebut.disabled=true

window.userLogin = () => {

  socket.emit('login', nicknameInput.value,userPw.value)
  socket.on('loggedInUsersCount',(data)=>{
    
    if(data[1]===true){

      messagebut.disabled=false
      console.log("Juhuu")
      loggedInDisplay.innerText = data[0]
    }
    else{loggedInDisplay.innerText = data}
    console.log(data)})
  
}

window.newUser = () => {socket.emit('newuser', NewUser.value,PW.value,confirmPW.value)}

window.sendMessage = () => {

  
  socket.emit('message', sendMessageInput.value, loggedInDisplay.innerText)
}

socket.on('loggedInUsersCount', (data) => {loggedInDisplay.innerText = data})

socket.on('print', (data)=>{
    
    console.log(data)
    chatPrint.innerHTML += `<p>User: ${data[0].User}   Message: ${data[0].Message} </p>`
})

window.allmessages=()=> {
  console.log("geht")
  socket.emit('allmessages')
  socket.on('printall', (data)=>{
    for(let i = 0; i < data.length; i++){
      chatPrint.innerHTML += `<p>User: ${data[i].User}   Message: ${data[i].Message} </p>`
    }
})
}


function logout(){
  nicknameInput.value = ''
  userPw.value=""
  loggedInDisplay.innerText=""
  messagebut.disabled=true
  chatPrint.innerHTML=""
  sendMessageInput.value=""

}

document.getElementById("logout-btn").addEventListener("click", logout)

