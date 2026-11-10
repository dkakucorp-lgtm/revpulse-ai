import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://teqmjllghmtgxxuadhbt.supabase.co'
const supabaseAnonKey = 'sb_publishable_iSbDfwSPy9xHCjlYLaygCQ_tMaHhYev'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)