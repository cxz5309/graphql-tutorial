const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const db = require('./models');
const express = require('express');
const http = require('http');
const configurePassport = require('../passport');
const userTypedefs = require('./types_resolvers/users/typeDefs.js');
const resolvers = require('./types_resolvers/index.js');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  configurePassport(app);

  app.get('/', async (req, res, next) => {
    console.log('테스트용');
    if (req.user) {
      res.send(`
      <h3>Login Success</h3>
          <a href="${env.DOMAIN}/api/auth/logout">Logout </a>
          <p>
              ${JSON.stringify(req.user, null, 2)}
          </p>
      `);
    } else {
      res.send(`
        <h3>Node Passport Social Login</h3>  
        <a href="${env.DOMAIN}/api/auth/google">Login with Google+</a>
        <a href="${env.DOMAIN}/api/auth/naver">Login with Naver</a>
        <a href="${env.DOMAIN}/api/auth/kakao">Login with Kakao</a>
      `);
    }
  });
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log('------ SQL Restructure Complete ------');
    })
    .catch((error) => {
      console.log(error);
    });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


startApolloServer([userTypedefs], resolvers)

module.exports = startApolloServer;