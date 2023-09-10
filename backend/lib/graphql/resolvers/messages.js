const resolvers = {
    Query: {
        findAllMessagesByConversation: async () => {
            return [];
        },
    },

    Mutation: {
        sendMessage: async () => {
            return null;
        },

        deleteMessage: async () => {
            return null;
        },

        updateMessage: async () => {
            return null;
        },
    },
};

export default resolvers;