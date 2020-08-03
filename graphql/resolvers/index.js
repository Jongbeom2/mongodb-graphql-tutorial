const personResolvers = require('./person');
const contentResolvers = require('./content');
const user1Resolvers = require('./user1');
const user2Resolvers = require('./user2');
const booking1Resolvers = require('./booking1');
const booking2Resolvers = require('./booking2');
const resolvers = {
  ...personResolvers,
  ...contentResolvers,
  ...user1Resolvers,
  ...user2Resolvers,
  ...booking1Resolvers,
  ...booking2Resolvers,
  Query: {
    ...personResolvers.Query,
    ...contentResolvers.Query,
    ...user1Resolvers.Query,
    ...user2Resolvers.Query,
    ...booking1Resolvers.Query,
    ...booking2Resolvers.Query
  },
  Mutation:{
    ...personResolvers.Mutation,
    ...contentResolvers.Mutation,
    ...user1Resolvers.Mutation,
    ...user2Resolvers.Mutation,
    ...booking1Resolvers.Mutation,
    ...booking2Resolvers.Mutation
  }
}

module.exports = resolvers; 