const contentResolvers = require('./content');

const resolvers = {
  ...contentResolvers,
  Query: {
    ...contentResolvers.Query,
  },
  Mutation:{
    ...contentResolvers.Mutation
  }
}

module.exports = resolvers; 