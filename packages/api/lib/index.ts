import app from "./app";
import * as greenlock from "greenlock-express";

// Create Server with SSL Zerifikat generator.
greenlock
  .create({
    // Agree to TOS (GER: AGB)
    agreeTos: true,
    // Insert EXPRESS
    app,
    // Configuration Folder
    configDir: "./.config/",
    // Valid E-Mail for Let's Encrypt
    email: "datenschutz@ec-nordbund.de"
  })
  // Use Standard Ports
  .listen(80, 443);
