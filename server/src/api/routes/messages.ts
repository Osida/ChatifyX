import {dbTables, RouteConfig} from "../../db";

export const messagesConfig: Record<string, RouteConfig> = {
    getAllMessagesByConversationHandler: {
        table: dbTables.messages,
        successMessage: "Successfully retrieved messages",
        notFoundMessage: "No messages were found",
    },
    createMessageHandler: {
        table: dbTables.messages,
        successMessage: "Successfully created a message",
        notFoundMessage: "No message was created",
    },
    updateMessageHandler: {
        table: dbTables.messages,
        successMessage: "Successfully updated the message",
        notFoundMessage: "No message was updated",
    },
    deleteMessageHandler: {
        table: dbTables.messages,
        successMessage: "Successfully deleted the message",
        notFoundMessage: "No message was deleted"
    }
};