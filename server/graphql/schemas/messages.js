import gql from "graphql-tag";

const typeDefs = gql`
    # Represents a Message within a conversation
    type Message {
        # Unique identifier for a message
        id: ID!
        # Content of the message
        content: String!
        # Sender of the message
        sender: User
        # Timestamp when the message was sent
        createdAt: Date!
    }

    # Input type for sending a new message
    input SendMessageInput {
        # The ID of the conversation to send the message to
        conversationId: ID!
        # The ID of the user sending the message
        senderId: ID!
        # Text content of the message
        body: String!
    }
    
    # Input type for updating a message by ID
    input UpdateMessageInput {
        # The ID of the message to update
        id: ID!
        # The new text content of the message
        content: String!
    }
`;

export default typeDefs;