import { createClient } from '@supabase/supabase-js'

const { PROJECT_URL, API_KEY_PUBLIC } = Bun.env
const supabaseUrl = PROJECT_URL as string
const supabaseKey = API_KEY_PUBLIC as string
export const supabase = createClient(supabaseUrl, supabaseKey)