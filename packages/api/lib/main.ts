import { Waiter } from './Waiter';
import * as chokidar from 'chokidar';
import decache from 'decache';

//some inital Vars
let _server = {
  stopServer() {},
  createServer() {}
};
let _waiter: Waiter;

restartServer();

// Create Watcher
chokidar.watch(__dirname).on("all", () => _waiter.delay());

async function restartServer() {
  // Restart server
  await _server.stopServer();
  _server = reRequire("./server");
  await _server.createServer();
  _waiter = new Waiter(5000, restartServer);
}

function reRequire(path: string) {
  decache(path);
  return require(path);
}
