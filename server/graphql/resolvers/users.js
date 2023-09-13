const resolvers = {
    Query: {
        findAllUsers: (parent, args, contextValue, info) => {
            return [];
        },

        findUserById: async (parent, args, contextValue, info) => {
            return null;
        },

        findUserByUsername: async (parent, args, contextValue, info) => {
            return null;
        },
    },

    Mutation: {
        createUsername: (parent, {username}, contextValue, info) => {
            console.log(`contextValue from mutation: `, contextValue);
            return null;
        },

        updateUser: () => {
            return null;
        },

        deleteUser: () => {
            return null;
        },
    },
};

export default resolvers;