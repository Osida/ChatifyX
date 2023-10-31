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

// Add GraphQL Yoga server to the existing Elysia API server
// const myYoga = createYoga({
//     schema: createSchema({typeDefs, resolvers})
// });

app.use(
    yoga({

        typeDefs: /* GraphQL */`
            type Query {
                hi: String
                getUserById(id: ID!): [User]
            }

            type User {
                id: ID!
                created_at: String
                username: String
                email: String
                phone_number: String
                password_hash: String
                last_login: String
                profile_picture: String
                status: String
            }
        `,
        context: {
            name: "Mobius"
        },
        useContext(_) {
        },
        resolvers: {
            Query: {
                hi: async (parent, args, context, info) => {
                    console.log("args: ", args);
                    console.log("context: ", context);
                    return context.name;
                },
                getUserById: async (parent, args, context, info) => {
                    console.log("args: ", args);
                    // console.log("context: ", context);
                    return null;
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


