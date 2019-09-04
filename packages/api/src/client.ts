import { api } from "./api";
import { client } from "api-socket-io";

let login = client<api>(api, 'localhost:4000')