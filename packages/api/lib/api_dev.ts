import { getApp } from "./express";
import * as http from "http";

const app = getApp(true);

const server = http.createServer(app).listen(4000);

declare const module: any;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    server.close();
  });
}
