import gql from "graphql-tag";

const typeDefs = gql`
    # Details of a participant in a Conversation
    type Participant {
        # Unique identifier for a participant
        id: ID!
        # Associated User details
        user: User
        # Whether the latest message has been seen by the participant
        hasSeenLatestMessage: Boolean
    }

    # Represents a Conversation in the system
    type Conversation {
        # Unique identifier for a conversation
        id: ID!
        # Most recent message in the conversation
        latestMessage: Message
        # Participants of the conversation
        participants: [Participant]
        # Timestamp of the latest update
        updatedAt: Date
    }

    # Input type for creating a Conversation
    input ConversationCreateInput {
        # IDs of the participants
        participantIds: [ID!]!
    }

    # Input type for updating participants in a Conversation
    input UpdateParticipantsInput {
        # The ID of the conversation to update
        conversationId: ID!
        # IDs of the new participants
        participantIds: [ID!]!
    }

    # Payload for the conversationUpdated subscription
    type ConversationUpdatedSubscriptionPayload {
        # Updated conversation details
        conversation: Conversation
        # IDs of users added to the conversation
        addedUserIds: [ID]
        # IDs of users removed from the conversation
        removedUserIds: [ID]
    }
`;

export default typeDefs;