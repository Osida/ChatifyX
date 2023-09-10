import gql from "graphql-tag";

const typeDefs = gql`
    # Represents a User in the system
    type User {
        # Unique identifier for a user
        id: ID!
        # Username of the user
        username: String!
    }

    # Input type for updating a User
    input UserUpdateInput {
        # The ID of the user to update
        id: ID!
        # New username to update
        username: String!
    }
`;

export default typeDefs;
