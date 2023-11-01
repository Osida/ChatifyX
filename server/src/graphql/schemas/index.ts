export const typeDefinitions = /* GraphQL */`
    scalar Date

    type Query {
        getUsers: UserPayload
        getUserById(id: ID!): UserPayload
        getParticipantsByConversationId(id: ID!): ParticipantPayload
        getConversations: ConversationPayload
        getConversationById(id: ID!): ConversationPayload
        getMessageById(id: ID!): MessagePayload
    }

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

    interface Payload {
        code: Int!
        success: Boolean!
        message: String!
    }

    type UserPayload implements Payload {
        code: Int!
        success: Boolean!
        message: String!
        data: [User]
    }

    type MessagePayload implements Payload {
        code: Int!
        success: Boolean!
        message: String!
        data: [Message]
    }

    type ConversationPayload implements Payload {
        code: Int!
        success: Boolean!
        message: String!
        data: [Conversation]
    }

    type ParticipantPayload implements Payload {
        code: Int!
        success: Boolean!
        message: String!
        data: [Participant]
    }
`;