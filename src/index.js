// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { context } from './graphql/context';

import { resolvers, typeDefs } from './graphql/schema';

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // context,
//   dataSources: () => {
//     return {
//       postApi: new PostsApi(),
//       userApi: new UsersApi(),
//       loginApi: new LoginApi(),
//       commentDb: new CommentSQLDataSource(knex),
//     };
//   },
//   uploads: false,
//   cors: {
//     origin: ['https://studio.apollographql.com'],
//     credentials: true,
//   },
//   subscriptions: {
//     onConnect: (connectionParams, ws, _context) => {
//       return {
//         req: ws.upgradeReq,
//       };
//     },
//     path: '/',
//     keepAlive: 5000,
//   },
// });

// server.listen(4003).then(({ url }) => {
//   console.log(`Server listening on url ${url}`);
// });

// (async () => {
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//     context
//   });
//   console.log(url);
// })();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    cors: {
      origin: ['http://localhost:4000'],
      credentials: true,
    },
  });
  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
}

startApolloServer();
