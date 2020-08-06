const Person = require('../../models/person');
const resolvers = {
  Query: {
    async people(_, args){
      try {
        const people = await Person.find();
        return people;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Person: {
    _id(_, args) {
      return _._id;
    },
    name(_, args) {
      return _.name;
    },
    async friends(_,args){
      const friends = await Person.find({ _id: { $in: _.friendIds } })
      return friends
    },
  },
  Mutation: {
    async createPerson(_, args){
      try {
        const person = new Person({
          ...args.personInput
        })
        const result = await person.save();
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  }
};

module.exports = resolvers; 