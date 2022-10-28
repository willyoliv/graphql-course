import { ApolloServer } from 'apollo-server';
import { context } from './graphql/context';

import { UsersApi } from './graphql/schema/user/datasources';
import { PostsApi } from './graphql/schema/post/datasources';
import { LoginApi } from './graphql/schema/login/datasources';

import { resolvers, typeDefs } from './graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi()
    }
  },
  uploads:false,
  cors: {
    origin: ['https://studio.apollographql.com'],
    credentials: true,
  }
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
