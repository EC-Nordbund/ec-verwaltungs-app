import app from "./app";
import * as greenlock from "greenlock-express";

greenlock
  .create({
    agreeTos: true,
    app,
    configDir: "./.config/",
    email: "datenschutz@ec-nordbund.de"
  })
  .listen(80, 443);
