const Content = require('../../models/content');
const { startSession } = require('mongoose');
const resolvers = {
  Query: {
    contents: async (_, args) => {
      try {
        const contents = await Content.find();
        return contents;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Content: {
    _id(_, args) {
      return _._id;
    },
    title(_, args) {
      return _.title;
    },
    content(_, args) {
      return _.content;
    },
    createdAt(_,args){
      return _.createdAt;
    }
  },
  Mutation: {
    createContent: async (_, args) => {
      try {
        const content = new Content({
          ...args.contentInput
        })
        const result = await content.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createContent1: async (_, args) => {
      const session = await startSession();
      try {
        session.startTransaction();
        const content1 = new Content({
          ...args.contentInput
        })
        const content2 = new Content({
          ...args.contentInput
        })
        const result = []
        result.push(await content1.save({ session }));
        // Test transaction with this!
        //throw new Error('Error in createContent2'); 
        result.push(await content2.save({ session }));
        await session.commitTransaction();
        return result;
      } catch (err) {
        await session.abortTransaction();
        console.log(err);
        throw err;
      } finally {
        await session.endSession();
      }
    },
    createContent2: async (_, args) => {
      try {
        const content1 = new Content({
          ...args.contentInput
        })
        const content2 = new Content({
          ...args.contentInput
        })
        const result = []
        result.push(await content1.save());
        // Test transaction with this!
        //throw new Error('Error in createContent2'); 
        result.push(await content2.save());
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};

module.exports = resolvers; 