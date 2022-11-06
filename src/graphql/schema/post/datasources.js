import { RESTDataSource } from '@apollo/datasource-rest';
import { makePostDataLoader } from './dataloaders';
import { createPostFn, updatePostFn, deletePostFn } from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }

  async getPost(id) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  async createPost(postData, userApi) {
    return createPostFn(postData, this, userApi);
  }

  async updatePost(postId, postData, userApi, loggedUserId) {
    return updatePostFn(postId, postData, this, userApi, loggedUserId);
  }

  async deletePost(postId, loggedUserId) {
    return deletePostFn(postId, this, loggedUserId);
  }

  batchLoadByUserId(id) {
    return this.dataLoader.load(id);
  }
}
