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
import {
    APIResponseData,
    ConversationDataSchema,
    MessageDataSchema,
    ParticipantDataSchema,
    UserDataSchema
} from "./db/types";
import {GraphQLScalarType} from "graphql/type";
import {Kind} from "graphql/language";

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

        typeDefs: /* GraphQL */`
            scalar Date

            type Query {
                getUsers: [User]
                getUserById(id: ID!): [User]
                getParticipantsByConversationId(id: ID!): [Participant]
                getConversations: [Conversation]
                getConversationById(id: ID!): [Conversation]
                getMessageById(id: ID!): [Message]
            }

            type OperationResponse {
                code: Int!
                success: Boolean!
                message: String!
                payload: Payload
            }
            union Payload = User | Message | Conversation | Participant

            type User {
                id: Int!
                email: String
                username: String
                phone_number: String
                password_hash: String
                online_status: Boolean!
                profile_picture: String
                last_login: Date!
                created_at: Date!
            }

            type Participant {
                id: Int!
                user_id: Int!
                conversation_id: Int!
                last_read_message_id: Int
                created_at: Date!
            }

            type Conversation {
                id: Int!
                name: String
                created_at: Date!
            }

            type Message {
                id: Int!
                user_id: Int!
                conversation_id: Int!
                message_text: String
                message_type: String
                read: Boolean
                created_at: Date!
            }
        `,
        context: {
            name: "Mobius"
        },
        useContext(_) {
        },
        resolvers: {
            Query: {
                getUsers: async (parent, args, context, info) => {
                    try {
                        const response = await getAllUsersHandler();
                        const {message, data}: APIResponseData<UserDataSchema> = await response.json();
                        if (response.status === 404) return [];
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getUsers: `, error);
                        return null;
                    }
                },
                getUserById: async (parent, {id}: { id: string }, context, info) => {
                    try {
                        const response = await getUserByIdHandler({params: {id}});
                        const {message, data}: APIResponseData<UserDataSchema> = await response.json();
                        if (response.status === 404) return [];
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getUserById: `, error);
                        return null;
                    }
                },
                getParticipantsByConversationId: async (parent, {id}: { id: string }, context, info) => {
                    try {
                        const response = await getAllParticipantsByConversationHandler({params: {id}});
                        const {message, data}: APIResponseData<ParticipantDataSchema> = await response.json();
                        if (response.status === 404) return [];
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getParticipantsByConversationId: `, error);
                        return null;
                    }
                },
                getConversations: async (parent, args, context, info) => {
                    try {
                        const response = await getAllConversationsHandler();
                        const {message, data}: APIResponseData<ConversationDataSchema> = await response.json();
                        if (response.status === 404) return [];
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getConversations: `, error);
                        return null;
                    }
                },
                getConversationById: async (parent, {id}: { id: string }, context, info) => {
                    try {
                        const response = await getConversationByIdHandler({params: {id}});
                        const {message, data}: APIResponseData<ConversationDataSchema> = await response.json();
                        if (response.status === 404) return [];
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getConversationById: `, error);
                        return null;
                    }
                },
                getMessageById: async (parent, {id}: { id: string }, context, info) => {
                    try {
                        const response = await getAllMessagesByConversationHandler({params: {id}});
                        const {message, data}: APIResponseData<MessageDataSchema> = await response.json();
                        if (response.status === 404) return [];
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getAllMessagesByConversationHandler: `, error);
                        return null;
                    }
                },
            }
        },
    })
);

app.listen(8000, ({hostname, port}) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
});


