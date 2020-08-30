const Booking1 = require("../../models/booking1");
const User1 = require("../../models/user1");
const { startSession } = require("mongoose");
const resolvers = {
  Query: {
    booking1s(_, args) {
      return Booking1.find();
    },
  },
  Booking1: {
    user1(_, args) {
      return User1.findOne({ booking1Ids: { $in: _._id } });
    },
  },
  Mutation: {
    async createBooking1(_, args) {
      const session = await startSession();
      try {
        session.startTransaction();
        const booking1 = new Booking1({
          name: args.booking1Input.name,
        });
        const result = await booking1.save({ session });
        await User1.findByIdAndUpdate(
          args.booking1Input.user1Id,
          { $push: { booking1Ids: result._id } },
          { session: session, useFindAndModify: false }
        );
        await session.commitTransaction();
        return result;
      } catch (error) {
        await session.abortTransaction();
        console.log(error);
        throw error;
      } finally {
        await session.endSession();
      }
    },
  },
};

module.exports = resolvers;
