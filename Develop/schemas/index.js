const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./server/models/user.js');
const bookTypeDefs = require('./server/models/book.js');

const userResolvers = require('./resolvers/user');
const bookResolvers = require('./resolvers/book');

const typeDefs = mergeTypeDefs([userTypeDefs, bookTypeDefs]);
const resolvers = mergeResolvers([userResolvers, bookResolvers]);

module.exports = { typeDefs, resolvers };