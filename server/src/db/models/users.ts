export interface UserSchema {
    id: number,
    username: string | null,
    email: string | null,
    phone_number: string | null,
    password_hash: string | null,
    last_login: string,
    profile_picture: string | null,
    status: string | null,
    created_at: string
}

export type UserData = UserSchema[] | [] | null