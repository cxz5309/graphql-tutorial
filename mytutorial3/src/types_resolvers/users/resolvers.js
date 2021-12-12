const { User } = require('../../models');

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      console.log(id);
      const user = await User.findOne({
        where: { id }
      });
      return user
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      console.log(input);
      const { name, role, department, email, about } = input;
      User.create({
        name, role, department, email, about
      })
      return true;
    },
    deleteUser: async (_, { id }) => {
      User.destroy({
        where: { id }
      })
      return true;
    }
  }
}

module.exports = userResolvers;