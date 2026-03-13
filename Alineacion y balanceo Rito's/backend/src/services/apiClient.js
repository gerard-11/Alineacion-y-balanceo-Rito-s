import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const SUPABASE_URL = 'https://rlouhqfqxxbjtpsheant.supabase.co'
const SUPABASE_KEY = process.env.EXTERNAL_API_KEY

if (!SUPABASE_KEY) {
  console.error('⚠️  ERROR: EXTERNAL_API_KEY no está configurada en .env')
  process.exit(1)
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper function para logging
export const logRequest = (table, operation) => {
  console.log(`[SUPABASE] ${operation.toUpperCase()} ${table}`)
}

export const logResponse = (table, operation, data) => {
  console.log(`[SUPABASE RESPONSE] ${operation.toUpperCase()} ${table} - ${Array.isArray(data) ? data.length : 1} row(s)`)
}

export const logError = (table, operation, error) => {
  console.error(`[SUPABASE ERROR] ${operation.toUpperCase()} ${table}:`, error.message)
}
