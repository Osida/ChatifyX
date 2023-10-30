import {dbTables} from "../../db";
import {RouteConfig} from "../../db/types";

export const participantsConfig: Record<string, RouteConfig> = {
    getAllParticipantsByConversationHandler: {
        table: dbTables.participants,
        successMessage: "Successfully retrieved participants",
        notFoundMessage: "No participants were found"
    },
    createParticipantHandler: {
        table: dbTables.participants,
        successMessage: "Successfully created a participant",
        notFoundMessage: "No participant was created"
    },
    updateParticipantHandler: {
        table: dbTables.participants,
        successMessage: "Successfully updated the participant",
        notFoundMessage: "No participant was updated"
    },
    deleteParticipantHandler: {
        table: dbTables.participants,
        successMessage: "Successfully deleted the participant",
        notFoundMessage: "No participant was deleted"
    }
};