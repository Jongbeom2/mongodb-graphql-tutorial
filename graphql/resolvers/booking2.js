const Booking2 = require('../../models/booking2');
const User2 = require('../../models/user2');
const resolvers = {
  Query: {
    booking2s: async (_, args) => {
      try {
        const booking2s = await Booking2.find();
        return booking2s;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Booking2: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    user2: async (_, args) => {
      try {
        const user2 = await User2.findById(_.user2Id);
        return user2;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    createBooking2: async (_, args) => {
      try {
        const booking2 = new Booking2({
          name: args.booking2Input.name,
          user2Id: args.booking2Input.user2Id
        })
        const result = await booking2.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
};

module.exports = resolvers; 