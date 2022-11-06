import { AuthenticationError } from 'apollo-server';
import { checkIsLoggedIn } from '../login/utils/login-functions';

// Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources, loggedUserId }) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in');
  }
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  data.userId = loggedUserId;
  return dataSources.postApi.createPost(data, dataSources.userApi);
};

const updatePost = async (_, { postId, data }, { dataSources, loggedUserId }) => {
  return dataSources.postApi.updatePost(postId, data, dataSources.userApi, loggedUserId);
};

const deletePost = async (_, { postId }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  return dataSources.postApi.deletePost(postId, loggedUserId);
};

// Field resolver
const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadById(userId);
};

const comments = async ({ id: post_id }, _, { dataSources }) => {
  return dataSources.commentDb.batchLoad(post_id);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost, updatePost, deletePost },
  Post: { user, comments },
};
