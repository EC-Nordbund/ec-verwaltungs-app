import app from "./app";
import * as http from "http";

// Create HTTP Server
http
  // from Express App
  .createServer(app)
  // Listen at 31415 in dev
  .listen(31415, () =>
    console.log(`🚀 Server ready at http://localhost:31415/graphql`)
  );
