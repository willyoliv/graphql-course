import { AuthenticationError, ValidationError } from 'apollo-server';
import { FetchError } from 'node-fetch';

export const createPostFn = async (postData, dataSource, userApi) => {
  const postInfo = await createPostInfo(postData, dataSource, userApi);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSource.post('', { body: { ...postInfo } });
};

export const findPostOwner = async (postId, dataSource, loggedUserId) => {
  const foundPost = await dataSource.get(postId, undefined, {
    cacheOptions: { ttl: 0 },
  });

  if (!foundPost) {
    throw new FetchError('Could not find the post you are looking for.');
  }

  if (foundPost.userId !== loggedUserId) {
    throw new AuthenticationError('You cannot update this post!');
  }

  return foundPost;
};

export const updatePostFn = async (postId, postData, dataSource, userApi, loggedUserId) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }

  const { userId } = await findPostOwner(postId, dataSource, loggedUserId);
  const { title, body } = postData;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('title missing');
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('body missing');
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('userId missing');
    }
    await userExists(userId, userApi);
  }

  return dataSource.patch(postId, { body: { ...postData } });
};

export const deletePostFn = async (postId, dataSource, loggedUserId) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }
  await findPostOwner(postId, dataSource, loggedUserId);

  const deleted = await dataSource.delete(postId);

  return !!deleted;
};

const userExists = async (userId, userApi) => {
  try {
    await userApi.getUser(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};

const createPostInfo = async (postData, dataSource, userApi) => {
  const { title, body, userId } = postData;

  await userExists(userId, userApi);

  const indexRefPost = await dataSource.get('', {
    params: {
      _limit: 1,
      _sort: 'indexRef',
      _order: 'desc',
    },
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
