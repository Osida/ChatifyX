import {supabase} from "../../db";
import {handleBodyParse, handleResponse, routeConfig} from "../index";
import {DBResponse, UserDataSchema} from "../../db/types";

export const getAllUsersHandler = async () => {
    const handlerName = "getAllUsersHandler";
    const {table, successMessage, notFoundMessage} = routeConfig[handlerName];

    const {data, error}: DBResponse<UserDataSchema> = await supabase
        .from(table)
        .select("*");

    if (!error && (!data || data.length === 0))
        return new Response(JSON.stringify({message: notFoundMessage}), {status: 404});

    return handleResponse(handlerName, error, successMessage, data);
};

export const getUserByIdHandler = async ({params: {id}}: { params: { id: string } }) => {
    const handlerName = "getUserByIdHandler";
    const {table, successMessage, notFoundMessage} = routeConfig[handlerName];

    const {data, error}: DBResponse<UserDataSchema> = await supabase
        .from(table)
        .select("*")
        .eq("id", parseInt(id));

    if (!error && (!data || data.length === 0))
        return new Response(JSON.stringify({message: notFoundMessage}), {status: 404});

    return handleResponse(handlerName, error, successMessage, data);
};

export const createUserHandler = async ({body}: { body: any }) => {
    const handlerName = "createUserHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<UserDataSchema> = await supabase
        .from(table)
        .insert(parsedBody);

    return handleResponse(handlerName, error, successMessage);
};

export const updateUserHandler = async ({params: {id}, body}: { params: { id: string }, body: any }) => {
    const handlerName = "updateUserHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const parsedBody = handleBodyParse(handlerName, body);
    const {error}: DBResponse<UserDataSchema> = await supabase
        .from(table)
        .update(parsedBody)
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};

export const deleteUserHandler = async ({params: {id}}: { params: { id: string } }) => {
    const handlerName = "deleteUserHandler";
    const {table, successMessage} = routeConfig[handlerName];

    const {error}: DBResponse<UserDataSchema> = await supabase
        .from(table)
        .delete()
        .eq("id", parseInt(id));

    return handleResponse(handlerName, error, successMessage);
};

export const getUserByUsernameHandler = async (context: any) => {
    // const handlerName = "getUserByUsernameHandler";
    // const {table, successMessage, notFoundMessage} = routeConfig[handlerName];
    console.log("context: ", context);
};