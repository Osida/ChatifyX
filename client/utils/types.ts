import {Session} from "next-auth";

export interface AuthProps {
    session: Session | null;
    reloadSession: () => void;
}

export interface User {
    id: string;
    username: string;
}

export interface Message {
    id: string;
    content: string;
    sender: User;
    createdAt: string;
}

export interface Conversation {
    id: string;
    lastMessage: Message;
    participants: User[];
    createdAt: string;
}

export type Payload = User | Message | Conversation

export interface CreateUsernameData {
    createUsername: {
        code: number
        success: boolean
        message: string
        payload: Payload
    };
}

export interface CreateUsernameVars {
    username: string;
}