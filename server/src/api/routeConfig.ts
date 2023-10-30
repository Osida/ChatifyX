import {usersConfig} from "./routes/users";
import {conversationsConfig} from "./routes/conversations";
import {participantsConfig} from "./routes/participants";
import {messagesConfig} from "./routes/messages";
import {RouteConfig} from "../db/types";

export const routeConfig: Record<string, RouteConfig> = {
    ...usersConfig,
    ...conversationsConfig,
    ...participantsConfig,
    ...messagesConfig,
};