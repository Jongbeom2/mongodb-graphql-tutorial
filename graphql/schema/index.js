const { gql } = require('apollo-server');
const typeDefs = gql`
  type Content {
    _id: ID
    title: String
    content: String
  }
  type Query {
    contents: [Content]
  }
  input ContentInput{
    title: String
    content: String
  }
  type Mutation{
    createContent(contentInput: ContentInput): Content!
    createContent1(contentInput: ContentInput): [Content!]
    createContent2(contentInput: ContentInput): [Content!]
  }
`;

module.exports = typeDefs;