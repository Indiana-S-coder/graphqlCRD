// resolvers.js
const User = require('../models/user');

const resolvers = {
  Query: {
    async users(_, {id}) {
      return await User.find()
    }
  },
  Mutation: {
    createUser: async (_, { name, age, email }) => {
      const user = new User({ name, age, email });
      await user.save();
      return user;
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    }
  }
};

module.exports = resolvers;
