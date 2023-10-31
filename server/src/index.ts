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
import {APIResponseData, UserDataSchema} from "./db/types";
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
                getUserById(id: ID!): [User]
            }

            type User {
                id: Int!
                username: String
                email: String
                phone_number: String
                password_hash: String
                last_login: Date!
                profile_picture: String
                created_at: Date!
                online_status: Boolean!
            }
        `,
        context: {
            name: "Mobius"
        },
        useContext(_) {
        },
        resolvers: {
            Query: {
                getUserById: async (parent, {id}: { id: string }, context, info) => {
                    try {
                        const response = await getUserByIdHandler({params: {id}});
                        const {message, data}: APIResponseData<UserDataSchema> = await response.json();
                        return data;
                    } catch (error) {
                        console.error(`Error in resolver getUserById: `, error);
                        return null;
                    }
                }
            }
        },
    })
    // yoga({
    //     typeDefs: /* GraphQL */`
    //         type CommonFields {
    //             id: ID!
    //             created_at: String
    //         }
    //
    //         type OperationResponse {
    //             code: Int!
    //             success: Boolean!
    //             message: String!
    //             payload: Payload
    //         }
    //
    //         union Payload = User | Message | Conversation | Participant
    //
    //         type User {
    //             id: ID!
    //             created_at: String
    //             username: String
    //             email: String
    //             phone_number: String
    //             password_hash: String
    //             last_login: String
    //             profile_picture: String
    //             status: String
    //         }
    //
    //         type Message {
    //             id: ID!
    //             created_at: String
    //             user_id: ID!
    //             conversation_id: ID!
    //             message_text: String
    //             message_type: String
    //             read: Boolean
    //         }
    //
    //         type Conversation {
    //             id: ID!
    //             created_at: String
    //             name: String
    //         }
    //
    //         type Participant {
    //             id: ID!
    //             created_at: String
    //             user_id: ID!
    //             conversation_id: ID!
    //             last_read_message_id: ID
    //             created_at: String
    //         }
    //
    //         type Query {
    //             getUserById(id: ID!): [User]
    //         }
    //     `,
    //     resolvers: {
    //         Query: {
    //             getUserById: async (_: any, {id}: { id: string }) => {
    //                 if (!id) throw new Error("No ID provided");
    //                 const user = getUserByIdHandler({params: {id: id}});
    //                 console.log(user);
    //                 return null;
    //             }
    //         }
    //     }
    // })
);

app.listen(8000, ({hostname, port}) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
});


