import {RouteConfiguration} from "../types/api";
import {dbTables} from "../../db";

export const participantsConfig: Record<string, RouteConfiguration> = {
    getAllParticipantsByConversationHandler:{
        table: dbTables.participants,
        successMessage:"Successfully retrieved participants",
        notFoundMessage:"No participants were found"
    },
    createParticipantHandler:{
        table: dbTables.participants,
        successMessage:"Successfully created a participant",
        notFoundMessage:"No participant was created"
    },
    updateParticipantHandler:{
        table: dbTables.participants,
        successMessage:"Successfully updated the participant",
        notFoundMessage:"No participant was updated"
    },
    deleteParticipantHandler:{
        table: dbTables.participants,
        successMessage:"Successfully deleted the participant",
        notFoundMessage:"No participant was deleted"
    }
};