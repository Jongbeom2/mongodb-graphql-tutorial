const { gql } = require('apollo-server');
const typeDefs = gql`
type Query {
    contents: [Content]
    user1s: [User1]
    booking1s: [Booking1]
  }
  type Content {
    _id: ID
    title: String
    content: String
    createdAt: String
  }
  input ContentInput{
    title: String
    content: String
  }
  type Booking1{
    _id: ID
    name: String
    createdAt: String
  }
  input booking1Input{
    name: String
    userId: String
  }
  type User1{
    _id: ID
    name: String
    bookings: [Booking1]
    createdAt: String
  }
  input User1Input{
    name: String
  }
  type Mutation{
    createContent(contentInput: ContentInput): Content!
    createContent1(contentInput: ContentInput): [Content!]
    createContent2(contentInput: ContentInput): [Content!]
    createUser1(user1Input: User1Input): User1!
    createBooking1(booking1Input: booking1Input): Booking1!
  }
`;

module.exports = typeDefs;