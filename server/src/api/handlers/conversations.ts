import {supabase} from "../../db";
import {handleBodyParse, handleResponse, routeConfig} from "../index";
import {ConversationDataSchema, DBResponse} from "../../db/types";

export const getAllConversationsHandler = async () => {
    const handlerName = "getAllConversationsHandler";
    const {table, successMessage, notFoundMessage} = routeConfig[handlerName];

    const {data, error}: DBResponse<ConversationDataSchema> = await supabase
        .from(table)
        .select("*");

    if (!error && (!data || data.length === 0))
        return new Response(JSON.stringify({message: notFoundMessage}), {status: 404});
    return handleResponse(handlerName, error, successMessage, data);
};

export const getConversationByIdHandler = async ({params: {id}}: { params: { id: string } }) => {
    const handlerName = "getConversationByIdHandler";
    const {table, successMessage, notFoundMessage} = routeConfig[handlerName];

    const {data, error}: DBResponse<ConversationDataSchema> = await supabase
        .from(table).select("*")
        .eq("id", parseInt(id));

    if (!error && (!data || data.length === 0))
        return new Response(JSON.stringify({message: notFoundMessage}), {status: 404});

    return handleResponse(handlerName, error, successMessage, data);
};

export const createConversationHandler = async ({body}: { body: any }) => {
    const handlerName = "createConversationHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<ConversationDataSchema> = await supabase
        .from(table)
        .insert(parsedBody);

    return handleResponse(handlerName, error, successMessage);
};

export const updateConversationHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "updateParticipantHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<ConversationDataSchema> = await supabase
        .from(table)
        .update(parsedBody)
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};

export const deleteConversationHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "deleteParticipantHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const {error}: DBResponse<ConversationDataSchema> = await supabase
        .from(table)
        .delete()
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};