import {PostgrestError} from "@supabase/supabase-js";

export const logError = (context: string, error: Error | PostgrestError) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] - ERROR in ${context}: ${error?.message}`);
    console.error("stack" in error ? error.stack : null);
};