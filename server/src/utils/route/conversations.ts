import {RouteConfiguration} from "../types/DBResponse";
import {dbTables} from "../../db";

export const conversationsConfig: Record<string, RouteConfiguration> = {
    getAllConversationsHandler: {
        table: dbTables.conversations,
        successMessage: "Successfully retrieved conversations",
        notFoundMessage: "No conversations were found",
    },
    getConversationByIdHandler: {
        table: dbTables.conversations,
        successMessage: "Successfully retrieved the conversation",
        notFoundMessage: "No conversation was found",
    },
    createConversationHandler: {
        table: dbTables.conversations,
        successMessage: "Successfully created a conversation",
        notFoundMessage: "No conversation was created",
    },
    updateConversationHandler: {
        table: dbTables.conversations,
        successMessage: "Successfully updated the conversation",
        notFoundMessage: "No conversation was updated",
    },
    deleteConversationHandler: {
        table: dbTables.conversations,
        successMessage: "Successfully deleted the conversation",
        notFoundMessage: "No conversation was deleted",
    },
};