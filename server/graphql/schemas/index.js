import gql from "graphql-tag";
import userTypeDefs from "./users.js"
import messageTypeDefs from "./messages.js"
import conversationTypeDefs from "./conversations.js"

const commonTypeDefs = gql`
    # Scalar type for Date values
    scalar Date

    # Queries related to users, messages, and conversations
    type Query {
        # Search for all Users
        findAllUsers: [User]
        # Search a User by ID
        findUserById(id: ID!): User
        # Search a User by username
        findUserByUsername(username: String!): User
        # Retrieve all Messages for a specific conversation
        findAllMessagesByConversation(conversationId: ID!): [Message]
        # Fetch all Conversations
        findAllConversations: [Conversation]
        # Fetch a Conversation by ID
        findConversationById(id: ID!): Conversation
    }

    # Mutations related to users, messages, and conversations
    type Mutation {
        # Create a new User with a username
        createUsername(username: String!): OpResponse
        # Update a User's details
        updateUser(input: UserUpdateInput!): OpResponse
        # Delete a User by ID
        deleteUser(id: ID!): OpResponse
        # Send a new Message to a specific conversation
        sendMessage(input: SendMessageInput!): OpResponse
        # Delete a Message by ID
        deleteMessage(id: ID!): OpResponse
        # update a Message by ID
        updateMessage(input: UpdateMessageInput!): OpResponse
        # Create a new Conversation
        createConversation(input: ConversationCreateInput!): OpResponse
        # Mark a Conversation as read
        markConversationAsRead(userId: ID!, conversationId: ID!): Boolean
        # Delete a Conversation
        deleteConversation(conversationId: ID!): OpResponse
        # Update participants in a Conversation
        updateParticipants(input: UpdateParticipantsInput!): Boolean
    }

    # Subscriptions related to users, messages, and conversations
    type Subscription {
        # Subscribe to new messages in a specific conversation
        messageSent(conversationId: ID!): Message
        # Triggered when a new conversation is created
        conversationCreated: Conversation
        # Triggered when a conversation is updated
        conversationUpdated: ConversationUpdatedSubscriptionPayload
        # Triggered when a conversation is deleted
        conversationDeleted: OpResponse
    }

    # Common operation response fields
    type OpResponse {
        # HTTP status code
        code: Int!
        # Operation success status
        success: Boolean!
        # Operation message (usually an error message)
        message: String!
        # Operation payload (usually the created/updated/deleted object)
        payload: Payload
    }

    # Union type for different operation payloads
    union Payload = User | Message | Conversation
`

const typeDefs = [commonTypeDefs, userTypeDefs, conversationTypeDefs, messageTypeDefs];

export default typeDefs;