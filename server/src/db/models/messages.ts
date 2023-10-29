export interface MessageSchema {
    id: number,
    user_id: number,
    conversation_id: number,
    message_text: string,
    message_type: string,
    read: boolean,
    created_at: string
}

export type MessageData = MessageSchema[] | [] | null