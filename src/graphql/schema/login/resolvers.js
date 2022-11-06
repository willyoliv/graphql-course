import { checkOwner } from './utils/login-functions';

export const login = async (_, { data }, { dataSources, res}) => {
  const { userName, password } = data;
  return dataSources.loginApi.login(userName, password, res);
};

export const logout = async (_, { userName }, { dataSources, res , loggedUserId }) => {
  return dataSources.loginApi.logout(userName, res, loggedUserId);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout,
  },
};
