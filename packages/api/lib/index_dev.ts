import app from './app';
import * as http from 'http';

http
  .createServer(app)
  .listen(31415, () =>
    console.log(`🚀 Server ready at http://localhost:31415/graphql`)
  );
