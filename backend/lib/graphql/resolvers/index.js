import usersResolvers from "./users.js";
import conversationsResolvers from "./users.js";
import messagesResolvers from "./messages.js";
import merge from "lodash.merge";

const resolvers = merge({}, usersResolvers, messagesResolvers, conversationsResolvers);

export default resolvers;