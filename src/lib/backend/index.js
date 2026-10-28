import { localBackend } from './local'
import { supabase, supabaseBackend } from './supabase'

export const backend = supabase ? supabaseBackend : localBackend
