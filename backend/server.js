import express from 'express'
import { join } from 'path'
import { Server } from 'socket.io'
import http from 'http'
import {loginUser ,newUser, storeMessage,printMessages} from './database.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use('/', express.static(join(process.cwd(), 'frontend')))
  
server.listen(3000)

io.on('connection', (socket) => {
    console.log('a user has connected to our chat application.')
   
    socket.on('login', (nickname,password) => {

     loginUser(nickname,password).then(output=>{io.emit('loggedInUsersCount',output)})})
    socket.on('newuser', (user,password,confirmedPassword) => {
      newUser(user,password,confirmedPassword)
        .then(output=>{console.log(output)})})
    
    socket.on('allmessages',()=>{
      printMessages()
      .then(output => {io.emit('printall',output)})
    })
    
   

    socket.on('message', (message,User) => {
      
      if(message!=""){
        storeMessage(User,message)
          .then(output=>{io.emit('print', output);console.log(output)})
          
        
          
      }})
  })



