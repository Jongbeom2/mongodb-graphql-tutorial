const Booking2 = require("../../models/booking2");
const User2 = require("../../models/user2");
const resolvers = {
  Query: {
    booking2s(_, args) {
      return Booking2.find();
    },
  },
  Booking2: {
    user2(_, args) {
      return User2.findById(_.user2Id);
    },
  },
  Mutation: {
    createBooking2(_, args) {
      const booking2 = new Booking2({
        name: args.booking2Input.name,
        user2Id: args.booking2Input.user2Id,
      });
      return booking2.save();
    },
  },
};

module.exports = resolvers;
