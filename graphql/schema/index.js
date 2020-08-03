const { gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    books: [Book]
    people:[Person]
    contents: [Content]
    user1s: [User1]
    user2s: [User2]
    booking1s: [Booking1]
    booking2s: [Booking2]
  }
  type Book{
    title:String
    author: String
  }
  type Person{
    _id: ID
    name: String
    friends: [Person]
    createdAt: String
  }
  input personInput{
    name:String
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
    user1: User1
    createdAt: String
  }
  input Booking1Input{
    name: String
    user1Id: String
  }
  type Booking2{
    _id: ID
    name:String
    user2: User2
    createdAt: String
  }
  input Booking2Input{
    name: String
    user2Id: String
  }
  type User1{
    _id: ID
    name: String
    booking1s: [Booking1]
    createdAt: String
  }
  input User1Input{
    name: String
  }
  type User2{
    _id: ID
    name: String
    booking2s: [Booking2]
    createdAt: String
  }
  input User2Input{
    name: String
  }
  type Mutation{
    createContent(contentInput: ContentInput): Content!
    createContent1(contentInput: ContentInput): [Content!]
    createContent2(contentInput: ContentInput): [Content!]
    createUser1(user1Input: User1Input): User1!
    createUser2(user2Input: User2Input): User2!
    createBooking1(booking1Input: Booking1Input): Booking1!
    createBooking2(booking2Input: Booking2Input): Booking2!
    createPerson(personInput: personInput): Person!
  }
`;

module.exports = typeDefs;