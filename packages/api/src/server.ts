import { api } from "./api";
import { server } from "api-socket-io";

let servers = server(api, async (username:string, password:string)=>false, async ()=>[])