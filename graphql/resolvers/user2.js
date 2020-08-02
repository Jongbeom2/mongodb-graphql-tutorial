const User2 = require('../../models/user2');
const Booking2 = require('../../models/booking2');
const resolvers = {
  Query: {
    user2s: async (_, args) => {
      try {
        const user2s = await User2.find().populate('Booking2s');
        return user2s;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  User2: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    createUser2: async (_, args) => {
      try {
        const user2 = new User2({
          ...args.user2Input
        })
        const result = await user2.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
};

module.exports = resolvers; 