const users = async (_, { input }, { getUsers }) => {
  const apiFiltersInput = new URLSearchParams(input);
  const users = await getUsers('/?' + apiFiltersInput);
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const reponse = await getUsers('/' + id);
  const user = await reponse.json();
  return user;
};

const posts = async ({ id }, _, { postDataLoader }) => {
  return postDataLoader.load(id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
