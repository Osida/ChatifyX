import {Elysia} from "elysia";
import {swagger} from "@elysiajs/swagger";
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
    // .get("/?username=:username", getUserByUsernameHandler)
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

app.listen(8000, ({hostname, port}) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`);
});


