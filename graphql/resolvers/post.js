const Post = require('../../models/post');
const Tag = require('../../models/tag');
const resolvers = {
  Query: {
    async posts(_, args) {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Post: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    async tags(_, args) {
      const tags = await Tag.find({ _id: { $in: _.tagIds } })
      return tags
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    async createPost(_, args) {
      try {
        const post = new Post({
          ...args.postInput
        })
        const result = await post.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    async addTag(_, args) {
      try {
        const result = await Post.findByIdAndUpdate(args.postTagInput.postId,
          { $push: { tagIds: args.postTagInput.tagId } },
          { useFindAndModify: false }
        );
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};

module.exports = resolvers; 