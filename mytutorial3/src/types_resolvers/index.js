const path = require('path')
const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const resolversArray = loadFilesSync(path.join(__dirname, './**/resolvers.*'))
const resolvers = mergeResolvers(resolversArray);
console.log(resolvers);
module.exports = resolvers;