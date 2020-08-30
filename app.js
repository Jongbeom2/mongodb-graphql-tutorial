const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./models");
dbConnect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  // formatError: (error) => {
  //   console.log(error);
  //   return error;
  // },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
