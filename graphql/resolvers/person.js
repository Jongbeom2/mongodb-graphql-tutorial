const Person = require("../../models/person");
const resolvers = {
  Query: {
    people(_, args) {
      return Person.find();
    },
  },
  Person: {
    friends(_, args) {
      return Person.find({ _id: { $in: _.friendIds } });
    },
  },
  Mutation: {
    createPerson(_, args) {
      const person = new Person({
        ...args.personInput,
      });
      return person.save();
    },
  },
};

module.exports = resolvers;
