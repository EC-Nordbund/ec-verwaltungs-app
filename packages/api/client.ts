import * as io from "socket.io-client";
import { connector } from "./api";


async function login(username: string, password: string, superadmin: (users: Array<string>)=>Promise<string>):Promise<connector> {
  return new Promise((res, rej) => {
    const socket = io.default(process.env.API_URL)
    let uname = username
    let r = false
    socket.emit('login', {username, password})
    socket.on('superadmin', async (users: Array<string>) => {
      let u = await superadmin(users);
      uname = u;
      socket.emit('superadmin', uname)
    })
    socket.on('welcome', () => {
      r = true
      res(new connector(uname, socket))
    })

    const int = setInterval(() => {
      if(socket.disconnected) {
        r = true
        rej('Falsche Authentifizierung')
      }
      
      if(r) {
        clearInterval(int)
      }
    }, 500)
  })
}