const Post = require("../../models/post");
const Tag = require("../../models/tag");
const resolvers = {
  Query: {
    posts(_, args) {
      return Post.find();
    },
  },
  Post: {
    tags(_, args) {
      return Tag.find({ _id: { $in: _.tagIds } });
    },
  },
  Mutation: {
    createPost(_, args) {
      const post = new Post({
        ...args.postInput,
      });
      return post.save();
    },
    addTag(_, args) {
      return Post.findByIdAndUpdate(
        args.postTagInput.postId,
        { $push: { tagIds: args.postTagInput.tagId } },
        { useFindAndModify: false }
      );
    },
  },
};

module.exports = resolvers;
