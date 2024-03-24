const { createUser, login, saveBook, deleteBook } = require('../controllers/user-controller');

const resolvers = {
    Query: {
        getUser: (_, { id }) => getUserById(id),
    },
    Mutation: {
        createUser: (_, { username, email, password }) => createUser({ body: { username, email, password } }),
        login: (_, { email, password }) => login({ body: { email, password } }),
        saveBook: (_, { bookData }, context) => saveBook({ user: context.user, body: bookData }),
        deleteBook: (_, { bookId }, context) => deleteBook({ user: context.user, params: { bookId } }),
    }
};


module.exports = resolvers;
