export interface ParticipantSchema {
    id: number,
    user_id: number,
    conversation_id: number,
    last_read_message_id: number | null,
    joined_at: string
}

export type ParticipantData = ParticipantSchema[] | [] | null