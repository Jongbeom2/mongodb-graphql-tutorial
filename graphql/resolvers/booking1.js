const Booking1 = require('../../models/booking1');
const User1 = require('../../models/user1');
const { startSession } = require('mongoose');
const resolvers = {
  Query: {
    booking1s: async (_, args) => {
      try {
        const booking1s = await Booking1.find();
        return booking1s;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Booking1: {
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
    createBooking1: async (_, args) => {
      const session = await startSession();
      try {
        session.startTransaction();
        const booking1 = new Booking1({
          name: args.booking1Input.name
        })
        const result = await booking1.save({ session });
        await User1.findByIdAndUpdate(args.booking1Input.userId,
          { $push: { bookings: booking1 } },
          { session: session, useFindAndModify: false }
        );
        await session.commitTransaction();
        return result;
      } catch (error) {
        await session.abortTransaction();
        next(error);
      } finally {
        await session.endSession();
      }
    },
  }
};

module.exports = resolvers; 