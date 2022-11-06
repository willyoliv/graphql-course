import jwt from 'jsonwebtoken';
import { knex } from '../../knex';

import { UsersApi } from '../schema/user/datasources';
import { PostsApi } from '../schema/post/datasources';
import { LoginApi } from '../schema/login/datasources';

import { CommentSQLDataSource } from '../schema/comment/datasources';

const verifyJwtToken = async (token) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const userApi = new UsersApi();
    const foundUser = await userApi.getUser(userId);

    if (foundUser.token !== token) return '';

    return userId;
  } catch (e) {
    return '';
  }
};

const authorizeUserWithBearerToken = async (authorization) => {
  // if (!req || !req.headers || !req.headers.authorization) return '';

  // const { headers } = req;
  // const { authorization } = headers;

  try {
    const [_bearer, token] = authorization.split(' ');
    const a = await verifyJwtToken(token);
    return a;
  } catch (e) {
    return '';
  }
};


export const context = async ({req, res, connection} ) => {
  const loggedUserId = await authorizeUserWithBearerToken(req.headers.authorization || '');

  const theContext = {
    loggedUserId,
    res,
    dataSources: {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
      commentDb: new CommentSQLDataSource(knex),
    }
  };

  if (connection) {
    const userApi = new UsersApi();
    userApi.initialize({});
    theContext.dataSources = {
      userApi,
    };
  }
  

  return theContext;
};
