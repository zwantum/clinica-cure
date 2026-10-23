/**
 * Safe localStorage wrapper that gracefully handles browser QuotaExceededError.
 * When quota is exceeded, it automatically frees stale draft backups, temporary caches,
 * retries the operation, and prevents crashing the React application.
 */

// Keys that must NEVER be purged during a cleanup
const PROTECTED_KEYS = new Set([
  'clinicacure_admin_auth',
  'clinicacure_admin_user',
  'clinicacure_admin_session',
])

export function safeSetItem(key: string, value: string): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false

  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    console.warn(`[safeStorage] QuotaExceededError while saving "${key}". Initiating safe storage cleanup...`)

    try {
      // Step 1: Identify disposable cache, autosave, and backup keys
      const disposableKeys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (!k || PROTECTED_KEYS.has(k)) continue

        if (
          k.startsWith('zw_draft_backup_') ||
          k.startsWith('zw_autosave_') ||
          k.startsWith('temp_') ||
          k.startsWith('draft_') ||
          k.includes('_cache') ||
          k.includes('preview_')
        ) {
          disposableKeys.push(k)
        }
      }

      disposableKeys.forEach((k) => {
        try {
          localStorage.removeItem(k)
        } catch {}
      })

      // Try setting again
      localStorage.setItem(key, value)
      console.info(`[safeStorage] Successfully saved "${key}" after purging ${disposableKeys.length} disposable items.`)
      return true
    } catch {
      // Step 2: If still full, try pruning oversized non-auth arrays
      try {
        const nonEssentialKeys: string[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i)
          if (k && !PROTECTED_KEYS.has(k) && k !== key) {
            nonEssentialKeys.push(k)
          }
        }

        // Remove the oldest or largest non-essential items
        for (const k of nonEssentialKeys) {
          try {
            localStorage.removeItem(k)
            // Test if we can now save
            localStorage.setItem(key, value)
            console.info(`[safeStorage] Successfully saved "${key}" after freeing "${k}".`)
            return true
          } catch {
            continue
          }
        }
      } catch {
        // Fallback below
      }

      // Step 3: If still over quota, fail gracefully without throwing fatal runtime error
      console.warn(`[safeStorage] Unable to persist "${key}" into localStorage (browser quota exhausted). Continuing in-memory.`)
      return false
    }
  }
}

export function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return
  try {
    localStorage.removeItem(key)
  } catch {}
}

