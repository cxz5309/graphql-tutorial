import server from './server.js';
import { gql } from 'apollo-server-express';
import userTypedefs from './types_resolvers/users/typeDefs.js';
import userResolvers from './types_resolvers/users/resolvers.js';

// const typeDefs = gql`
//   type Query{
//     hello: String
//   }`;

// const resolvers = {
//   Query: {
//     hello: () => {
//       return 'World!'
//     }
//   }
// }

server([userTypedefs], [userResolvers])