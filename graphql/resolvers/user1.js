const User1 = require('../../models/user1');
const Booking1 = require('../../models/booking1');
const resolvers = {
  Query: {
    async user1s(_, args){
      try {
        const user1s = await User1.find();
        return user1s;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  User1: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    async booking1s(_,args){
      const booking1s = await Booking1.find({ _id: { $in: _.booking1Ids } })
      return booking1s
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    async createUser1(_, args){
      try {
        const user1 = new User1({
          ...args.user1Input
        })
        const result = await user1.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
};

module.exports = resolvers; 