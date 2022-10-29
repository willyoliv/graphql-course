import { ApolloServer } from 'apollo-server';
import { context } from './graphql/context';

import { knex } from './knex';

import { UsersApi } from './graphql/schema/user/datasources';
import { PostsApi } from './graphql/schema/post/datasources';
import { LoginApi } from './graphql/schema/login/datasources';

import { resolvers, typeDefs } from './graphql/schema';
import { CommentSQLDataSource } from './graphql/schema/comment/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
      commentDb: new CommentSQLDataSource(knex),
    };
  },
  uploads: false,
  cors: {
    origin: ['https://studio.apollographql.com'],
    credentials: true,
  },
  subscriptions: {
    onConnect: (connectionParams, ws, _context) => {
      return {
        req: ws.upgradeReq,
      };
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
