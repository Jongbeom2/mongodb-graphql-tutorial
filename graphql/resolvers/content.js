const Content = require("../../models/content");
const { startSession } = require("mongoose");
const resolvers = {
  Query: {
    contents(_, args) {
      // Test formatError with this!
      //throw new Error("Error in Content");
      return Content.find();
    },
  },
  Mutation: {
    createContent(_, args) {
      const content = new Content({
        ...args.contentInput,
      });
      return content.save();
    },
    async createContent1(_, args) {
      const session = await startSession();
      try {
        session.startTransaction();
        const content1 = new Content({
          ...args.contentInput,
        });
        const content2 = new Content({
          ...args.contentInput,
        });
        const result = [];
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
    async createContent2(_, args) {
      const content1 = new Content({
        ...args.contentInput,
      });
      const content2 = new Content({
        ...args.contentInput,
      });
      const result = [];
      result.push(await content1.save());
      // Test transaction with this!
      //throw new Error('Error in createContent2');
      result.push(await content2.save());
      return result;
    },
  },
};

module.exports = resolvers;
