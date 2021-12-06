require('dotenv').config();
import {ApolloServer} from 'apollo-server';
import {schema} from './schema';

const server = new ApolloServer({
  schema,
})

const Port = process.env.PORT || 4000;

server.listen(Port).then(({url})=>{
  console.log(`Server ready at ${url}`);
});

