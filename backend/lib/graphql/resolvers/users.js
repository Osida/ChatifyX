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
        createUser: () => {
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