const User2 = require("../../models/user2");
const Booking2 = require("../../models/booking2");
const resolvers = {
  Query: {
    user2s(_, args) {
      return User2.find();
    },
  },
  User2: {
    booking2s(_, args) {
      return Booking2.find({ user2Id: { $in: _._id } });
    },
  },
  Mutation: {
    createUser2(_, args) {
      const user2 = new User2({
        ...args.user2Input,
      });
      return user2.save();
    },
  },
};

module.exports = resolvers;
