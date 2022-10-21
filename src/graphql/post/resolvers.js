const post = async (_, { id }, { getPosts }) => {
  const response = await getPosts('/' + id);
  return response.json();
};

const posts = async (_, __, { getPosts }) => {
  const response = await getPosts();
  return response.json();
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
  Post: {
    unixTimestamp: ({ createdAt }) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};
