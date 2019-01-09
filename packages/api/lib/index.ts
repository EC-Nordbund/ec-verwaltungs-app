import app from './app';
import * as greenlock from 'greenlock-express';

greenlock
  .create({
    email: "datenschutz@ec-nordbund.de",
    agreeTos: true,
    configDir: "./.config/",
    app: app
  })
  .listen(80, 443);
