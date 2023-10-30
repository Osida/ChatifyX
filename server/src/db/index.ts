import {supabase} from "./client";
import {dbTables} from "./tables";
import {mockDatabase} from "./mockDB";

// types
import {ConversationData, DBResponse, MessageData, ParticipantData, RouteConfig, UserData} from "./types";

export {
    supabase,
    dbTables,
    mockDatabase,
    DBResponse,
    RouteConfig,
    UserData,
    ParticipantData,
    MessageData,
    ConversationData,
};