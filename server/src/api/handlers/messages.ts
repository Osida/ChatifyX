import {supabase} from "../../db";
import {handleBodyParse, handleResponse, routeConfig} from "../index";
import {DBResponse, MessageDataSchema} from "../../db/types";

export const getAllMessagesByConversationHandler = async ({params: {id}}: { params: { id: string } }) => {
    const handlerName = "getAllMessagesByConversationHandler";
    const {table, successMessage, notFoundMessage} = routeConfig[handlerName];

    const {data, error}: DBResponse<MessageDataSchema> = await supabase
        .from(table)
        .select("*")
        .eq("conversation_id", parseInt(id));

    if (!error && (!data || data.length === 0)) return new Response(JSON.stringify({message: notFoundMessage}), {status: 404});
    return handleResponse(handlerName, error, successMessage, data);
};

export const createMessageHandler = async ({body}: { body: any }) => {
    const handlerName = "createMessageHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<MessageDataSchema> = await supabase
        .from(table)
        .insert(parsedBody);

    return handleResponse(handlerName, error, successMessage);
};

export const updateMessageHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "updateMessageHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<MessageDataSchema> = await supabase
        .from(table)
        .update(parsedBody)
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};

export const deleteMessageHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "deleteMessageHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const {error}: DBResponse<MessageDataSchema> = await supabase
        .from(table)
        .delete()
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};