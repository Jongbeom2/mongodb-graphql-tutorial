const Post = require('../../models/post');
const Tag = require('../../models/tag');
const resolvers = {
  Query: {
    async tags(_, args){
      try {
        const tags = await Tag.find();
        return tags;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Tag: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    async posts(_,args){
      const posts = await Post.find({ tagIds: { $in: _._id } })
      return posts
    },
    createdAt(_, args) {
      return _.createdAt;
    },
  },
  Mutation: {
    async createTag(_, args){
      try {
        const tag = new Tag({
          ...args.tagInput
        })
        const result = await tag.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
};

module.exports = resolvers; 