import express from "express";
import * as http from 'http'
import socketIO from 'socket.io'
import { connector } from "./api";

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
server.listen(4000);

io.on('connection', function (socket) {
  socket.once('login',async (auth: {username:string, password:string}) => {
    let authOK = await checkLogin(auth.username, auth.password)
    if(authOK === 'superuser') {
      let users = await getUsers()    
      socket.once('superuser', (username: string) => {
        new connector(username, socket, false)
      })
      socket.emit('superuser', users)
      return
    }
    if(authOK) {
      new connector(auth.username, socket, false)
    } else {
      socket.emit('login-wrong')
      setTimeout(()=>{socket.disconnect()}, 5000)
    }
  })
  socket.emit('new-connection')
});

async function checkLogin(username:string, password: string):Promise<boolean|'superuser'> {
  return
}
async function getUsers():Promise<Array<string>> {
  return
}