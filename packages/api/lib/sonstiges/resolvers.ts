import {
  addUser,
  changePWD,
  deleteUser,
  getUser,
  login,
  logout,
  updateUser
  } from '../users';

export const resolvers = {
  Query: {},
  Mutation: {
    login: (parent, args) => login(args.username, args.password),
    logout: (parent, args) => logout(args.authToken),
    changePassword: (parent, args) =>
      changePWD(getUser(args.authToken).userID, args.oldPWD, args.newPWD),
    CreateUser: (parent, args) =>
      addUser(
        args.personID,
        args.username,
        args.email,
        args.gueltigBis,
        args.role
      ),
    DeleteUser: (parent, args) => deleteUser(args.userID),
    UpdateUser: (parent, args) =>
      updateUser(args.userID, args.gueltigBis, args.role)
  }
};
