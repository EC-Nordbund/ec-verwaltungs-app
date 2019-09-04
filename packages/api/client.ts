import { api } from "./src/api";
import { client } from "./builder/cons";

let login = client<api>(api, 'localhost:4000')