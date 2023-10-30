import {PostgrestError} from "@supabase/supabase-js";

export interface DBResponse<T> {
    data?: T | null;
    error: PostgrestError | null;
}

export interface RouteConfig {
    table: string,
    successMessage: string,
    notFoundMessage: string
}

export interface BaseSchema {
    id: number,
    created_at: string
}

export interface UserSchema extends BaseSchema {
    username: string | null,
    email: string | null,
    phone_number: string | null,
    password_hash: string | null,
    last_login: string,
    profile_picture: string | null,
    status: string | null
}

export type UserDataSchema = UserSchema[] | [] | null

export interface MessageSchema extends BaseSchema {
    user_id: number,
    conversation_id: number,
    message_text: string,
    message_type: string,
    read: boolean
}

export type MessageDataSchema = MessageSchema[] | [] | null

export interface ConversationSchema extends BaseSchema {
    name: string;
}

export type ConversationDataSchema = ConversationSchema[] | [] | null

export interface ParticipantSchema extends BaseSchema {
    user_id: number,
    conversation_id: number,
    last_read_message_id: number | null,
    joined_at: string
}

export type ParticipantDataSchema = ParticipantSchema[] | [] | null
