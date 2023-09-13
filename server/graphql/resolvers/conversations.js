const resolvers = {
    Query: {
        findAllConversations: async () => {
            return [];
        },

        findConversationById: async () => {
            return null;
        },
    },

    Mutation: {
        createConversation: async () => {
            return null;
        },

        markConversationAsRead: async () => {
            return false;
        },

        deleteConversation: async () => {
            return null;
        },

        updateParticipants: async () => {
            return false;
        },
    },
};

export default resolvers;