import {RouteConfig} from "../db";
import {usersConfig} from "./routes/users";
import {conversationsConfig} from "./routes/conversations";
import {participantsConfig} from "./routes/participants";
import {messagesConfig} from "./routes/messages";

export const routeConfig: Record<string, RouteConfig> = {
    ...usersConfig,
    ...conversationsConfig,
    ...participantsConfig,
    ...messagesConfig,
};