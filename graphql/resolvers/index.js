const contentResolvers = require('./content');
const user1Resolvers = require('./user1');
const booking1Resolvers = require('./booking1');
const resolvers = {
  ...contentResolvers,
  ...user1Resolvers,
  ...booking1Resolvers,
  Query: {
    ...contentResolvers.Query,
    ...user1Resolvers.Query,
    ...booking1Resolvers.Query
  },
  Mutation:{
    ...contentResolvers.Mutation,
    ...user1Resolvers.Mutation,
    ...booking1Resolvers.Mutation
  }
}

module.exports = resolvers; 