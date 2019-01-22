import { resolvers } from './resolvers';
import { typeDefs } from './typeDef';
import { ApolloServer } from 'apollo-server';

// Speichern des Servers
let server: ApolloServer;

// Erzeugen des Servers
export async function createServer() {
  // Create Server
  server = new ApolloServer({
    typeDefs,
    resolvers
  });

  // Start server
  await server
    .listen()
    .then(v => v.url)
    .then(console.log);

  return server;
}

// Stoppen des Servers
export async function stopServer() {
  await server.stop();
}
