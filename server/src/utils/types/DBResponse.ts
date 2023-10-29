import {PostgrestError} from "@supabase/supabase-js";
export interface DBResponse<T> {
    data?: T | null;
    error: PostgrestError | null;
}

export interface RouteConfiguration {
    table: string,
    successMessage: string,
    notFoundMessage: string
}