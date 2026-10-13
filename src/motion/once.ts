/**
 * Tiny in-memory registry used to keep a page-load entrance from replaying
 * when the visitor navigates back to a route they have already seen during
 * this page session (for example Home → About → back to Home).
 */
const played = new Set<string>()

export function hasPlayed(key: string): boolean {
  return played.has(key)
}

export function markPlayed(key: string): void {
  played.add(key)
}

export function resetPlayed(key?: string): void {
  if (key) played.delete(key)
  else played.clear()
}
