import { reRequire, Waiter } from './exports';
import * as chokidar from 'chokidar';

let server = {
  stopServer() {},
  createServer() {}
};
let waiter: Waiter;

restartServer();

chokidar.watch(__dirname).on("all", () => waiter.trigger());

async function restartServer() {
  await server.stopServer();
  server = reRequire("./server");
  await server.createServer();
  waiter = new Waiter(5000, restartServer);
}
