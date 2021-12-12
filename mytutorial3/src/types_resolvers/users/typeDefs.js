const { gql } = require('apollo-server-express')

const userTypedefs = gql`
  type User {
    id: Int!
    name: String
    role: String
    department: String
    email: String
    about: String
  }

  type Query {
    getUser(id: Int!): User!
  }

  type Mutation{
    createUser(input: createUserInput): Boolean!
    deleteUser(id: Int!): Boolean!
  }

  input createUserInput{
    name: String
    role: String
    department: String
    email: String!
    about: String
  }
`

module.exports = userTypedefs;