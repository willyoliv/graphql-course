
const users = async (_, __, { getUsers }) => {
  const users = await getUsers();
  return users.json();
};

const user = async (_, { id }, { getUsers }) => {
  const reponse = await getUsers("/" + id);
  const user = await reponse.json();
  return user;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
