import { server as server_api } from "api-socket-io/build/server";
import { api } from "./api";


export function server() {
  let servers = server_api(api, async (username:string, password:string)=>true, async ()=>[], 4000)

  // CRON
  setInterval(() => {
    // TODO: Mail handler
  }, 1000)

  setInterval(() => {
    
  }, 10 * 1000)

  setInterval(() => {
    // TODO: FZ Anrang handler
  }, 60 * 1000)

  setInterval(() => {
    
  }, 60 * 60 * 1000)

  setInterval(() => {
    
  }, 24 * 60 * 60 * 1000)
}

server()