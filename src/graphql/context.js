import fetch from 'node-fetch';
import { makePostDataLoader } from './post/dataloaders';
import { getPosts } from './post/utils';
import { makeUserDataLoader } from './user/dataloaders';
import { getUsers } from './user/utils';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(_getUsers),
    postDataLoader: makePostDataLoader(_getPosts),
    getUsers: _getUsers,
    getPosts: _getPosts,

  };
};
