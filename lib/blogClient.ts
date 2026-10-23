import { createClient } from '@supabase/supabase-js'
import { createBlogClient, SupabaseDatabaseAdapter } from '@zwantum/blog/core'
import { SupabaseStorageAdapter } from '@zwantum/blog/storage'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://xxxznjkotqwomxuwqeri.supabase.co'

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHpuamtvdHF3b214dXdxZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4Njc2NzMsImV4cCI6MjEwNzQ0MzY3M30._k58K5aJTGIjIwuLiVC0SrLhRZwvZIcjIl8purpd2fk'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const blogClient = createBlogClient({
  db: new SupabaseDatabaseAdapter(supabase as any),
  storage: new SupabaseStorageAdapter(supabase as any, { defaultBucket: 'media' }),
})

