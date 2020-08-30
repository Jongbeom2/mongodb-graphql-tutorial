const User1 = require("../../models/user1");
const Booking1 = require("../../models/booking1");
const resolvers = {
  Query: {
    user1s(_, args) {
      return User1.find();
    },
  },
  User1: {
    booking1s(_, args) {
      return Booking1.find({ _id: { $in: _.booking1Ids } });
    },
  },
  Mutation: {
    createUser1(_, args) {
      const user1 = new User1({
        ...args.user1Input,
      });
      return user1.save();
    },
  },
};

module.exports = resolvers;
