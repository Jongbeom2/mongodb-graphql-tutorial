const User2 = require('../../models/user2');
const Booking2 = require('../../models/booking2');
const resolvers = {
  Query: {
    async user2s(_, args) {
      try {
        const user2s = await User2.find();
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
    async booking2s(_, args) {
      const booking2s = await Booking2.find({ user2Id: { $in: _._id } });
      return booking2s
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    async createUser2(_, args) {
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