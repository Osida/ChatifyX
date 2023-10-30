import {supabase} from "../../db";
import {handleBodyParse, handleResponse, routeConfig} from "../index";
import {DBResponse, ParticipantDataSchema} from "../../db/types";

export const getAllParticipantsByConversationHandler = async ({params: {id}}: { params: { id: string } }) => {
    const handlerName = "getAllParticipantsByConversationHandler";
    const {table, successMessage, notFoundMessage} = routeConfig[handlerName];

    const {data, error}: DBResponse<ParticipantDataSchema> = await supabase
        .from(table)
        .select("*")
        .eq("conversation_id", parseInt(id));

    if (!error && (!data || data.length === 0)) return new Response(JSON.stringify({message: notFoundMessage}), {status: 404});
    return handleResponse(handlerName, error, successMessage, data);
};

export const createParticipantHandler = async ({body}: { body: any }) => {
    const handlerName = "createParticipantHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<ParticipantDataSchema> = await supabase
        .from(table)
        .insert(parsedBody);

    return handleResponse(handlerName, error, successMessage);
};

export const updateParticipantHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "updateParticipantHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<ParticipantDataSchema> = await supabase
        .from(table)
        .update(parsedBody)
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};

export const deleteParticipantHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "deleteParticipantHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const {error}: DBResponse<ParticipantDataSchema> = await supabase
        .from(table)
        .delete()
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};
