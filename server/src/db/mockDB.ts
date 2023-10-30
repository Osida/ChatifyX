export const mockDatabase = {
    users: [
        {
            id: 4,
            username: "user1",
            email: "user1@example.com",
            phone_number: "1234567890",
            password_hash: "hash1",
            last_login: "2023-10-27 14:30:00+00",
            profile_picture: "url1",
            status: "Online",
            created_at: "2023-10-01 14:30:00+00",
        },
        {
            id: 5,
            username: "user2",
            email: "user2@example.com",
            phone_number: "987654321",
            password_hash: "hash2",
            last_login: "2023-10-27 14:30:00+00",
            profile_picture: "url2",
            status: "Offline",
            created_at: "2023-10-02 14:30:00+00",
        },
        // Add more user data here
    ],
    participants: [
        {
            id: 9,
            user_id: 4,
            conversation_id: 2,
            last_read_message_id: null,
            joined_at: "2023-10-01 14:30:00+00",
        },
        {
            id: 10,
            user_id: 5,
            conversation_id: 2,
            last_read_message_id: null,
            joined_at: "2023-10-01 14:31:00+00",
        },
        // Add more participant data here
    ],
    messages: [
        {
            id: 4,
            user_id: 4,
            conversation_id: 2,
            message_text: "Hello World",
            message_type: "text",
            read: false,
            created_at: "2023-10-28 04:43:21+00",
        },
        {
            id: 5,
            user_id: 5,
            conversation_id: 3,
            message_text: "Hi there!",
            message_type: "text",
            read: false,
            created_at: "2023-10-26 04:44:00+00",
        },
        // Add more message data here
    ],
    conversations: [
        {
            id: 2,
            name: "GroupChat1",
            created_at: "2023-10-01 14:30:00+00",
        },
        {
            id: 3,
            name: "GroupChat2",
            created_at: "2023-10-02 14:30:00+00",
        },
        // Add more conversation data here
    ],
};

// Use the mockDatabase in your tests to simulate database interactions
