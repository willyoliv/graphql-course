import { AuthenticationError } from 'apollo-server';

export const checkisLoggedIn = (loggedUserId) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in');
  }
};

export const checkOwner = (userId, loggedUserId) => {
  checkisLoggedIn(loggedUserId);

  if (loggedUserId !== userId) {
    throw new AuthenticationError('You cannot update this user');
  }
};
