const Booking1 = require('../../models/booking1');
const User1 = require('../../models/user1');
const { startSession } = require('mongoose');
const resolvers = {
  Query: {
    async booking1s(_, args) {
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
    async user1(_, args) {
      try {
        const user1 = await User1.findOne({ booking1Ids: { $in: _._id } })
        console.log(user1);
        return user1;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    name(_, args) {
      return _.name;
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    async createBooking1(_, args) {
      const session = await startSession();
      try {
        session.startTransaction();
        const booking1 = new Booking1({
          name: args.booking1Input.name
        })
        const result = await booking1.save({ session });
        await User1.findByIdAndUpdate(args.booking1Input.user1Id,
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
  }
};

module.exports = resolvers; 