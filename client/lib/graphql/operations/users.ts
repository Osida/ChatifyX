import {gql} from "@apollo/client";

export default {
    Queries: {},
    Mutations: {
        createUserName: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    code
                    success
                    message
                    payload {
                        ... on User {
                            id
                            username
                        }
                    }
                }
            }
        `
    },
    Subscriptions: {},
};