import {PostgrestError} from "@supabase/supabase-js";
import {logError} from "../logging";
import {RouteConfiguration} from "../types/DBResponse";
import {usersConfig} from "./users";
import {conversationsConfig} from "./conversations";
import {participantsConfig} from "./participants";
import {messagesConfig} from "./messages";

export const routeConfig: Record<string, RouteConfiguration> = {
    ...usersConfig,
    ...conversationsConfig,
    ...participantsConfig,
    ...messagesConfig,
};

export const handleResponse = <T>(handlerName: string, error: PostgrestError | Error | null, successMsg: string, data?: T | null) => {
    if (error) {
        logError(handlerName, error);
        return new Response(JSON.stringify({message: error.message}), {status: 500});
    }

    return new Response(JSON.stringify({message: successMsg, data: data}), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    });
};

export const handleBodyParse = (handlerName: string, body: any) => {
    if (typeof body === "object" && body !== null) return body;

    try {
        if (typeof body === "string") return JSON.parse(body);
        console.error(`${handlerName} - Invalid body type. Body should be a stringified or an actual object.`);
    } catch (error) {
        console.error(`${handlerName} - Error parsing response body: `, error);
    }

    console.error(`${handlerName} - Body is neither a string nor an object`);
    return new Response(JSON.stringify({message: "Invalid request body"}), {status: 400});
};