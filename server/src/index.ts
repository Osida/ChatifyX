import {Elysia} from "elysia";
import {swagger} from "@elysiajs/swagger";
import {yoga} from "@elysiajs/graphql-yoga";

import {
    createConversationHandler,
    createMessageHandler,
    createParticipantHandler,
    createUserHandler,
    deleteConversationHandler,
    deleteMessageHandler,
    deleteParticipantHandler,
    deleteUserHandler,
    getAllConversationsHandler,
    getAllMessagesByConversationHandler,
    getAllParticipantsByConversationHandler,
    getAllUsersHandler,
    getConversationByIdHandler,
    getUserByIdHandler,
    updateConversationHandler,
    updateMessageHandler,
    updateParticipantHandler,
    updateUserHandler
} from "./api";
import {GraphQLScalarType} from "graphql/type";
import {Kind} from "graphql/language";
import {typeDefinitions} from "./graphql/schemas";
import {resolvers} from "./graphql/resolvers";

const app = new Elysia().use(swagger());

app.get("/", () => "Hello, welcome to ChatifyX's API");

app.group("/users", app => app
    .get("/", getAllUsersHandler)
    .get("/:id", getUserByIdHandler)
    .post("/", createUserHandler)
    .put("/:id", updateUserHandler)
    .delete("/:id", deleteUserHandler)
);

app.group("/messages", app => app
    .get("/:id", getAllMessagesByConversationHandler)
    .post("/", createMessageHandler)
    .put("/:id", updateMessageHandler)
    .delete("/:id", deleteMessageHandler)
);

app.group("/conversations", app => app
    .get("/", getAllConversationsHandler)
    .get("/:id", getConversationByIdHandler)
    .post("/", createConversationHandler)
    .put("/:id", updateConversationHandler)
    .delete("/:id", deleteConversationHandler)
);

app.group("/participants", app => app
    .get("/:id", getAllParticipantsByConversationHandler)
    .post("/", createParticipantHandler)
    .put("/:id", updateParticipantHandler)
    .delete("/:id", deleteParticipantHandler)
);

const resolverMap = {
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        // converts a value from the client into a JavaScript Date object
        parseValue(value) {
            return new Date(value as string | number | Date); // value from the client
        },
        // converts a JS Date object into a format that can be sent to the client
        serialize(value) {
            return (value as Date).getTime(); // value sent to the client
        },
        // converts an inline value from the client into a JS Date object
        parseLiteral(ast) {
            if (ast.kind === Kind.INT)
                return new Date(ast.value); // ast value is always in string format
            return null;
        },
    }),
};

app.use(
    yoga({

        typeDefs: typeDefinitions,
        context: {
            name: "Osida"
        },
        useContext(_) {
        },
        resolvers: resolvers
    })
);

app.listen(8000, ({hostname, port}) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
});