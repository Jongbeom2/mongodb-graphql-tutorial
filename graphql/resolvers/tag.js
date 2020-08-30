const Post = require("../../models/post");
const Tag = require("../../models/tag");
const resolvers = {
  Query: {
    tags(_, args) {
      return Tag.find();
    },
  },
  Tag: {
    posts(_, args) {
      return Post.find({ tagIds: { $in: _._id } });
    },
  },
  Mutation: {
    createTag(_, args) {
      const tag = new Tag({
        ...args.tagInput,
      });
      return tag.save();
    },
  },
};

module.exports = resolvers;
