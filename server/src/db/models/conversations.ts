export interface ConversationsSchema {
    id: number,
    name: string,
    created_at: string
}

export type ConversationData = ConversationsSchema[] | [] | null