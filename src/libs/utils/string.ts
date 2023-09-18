// Truncate string based on character limit
export function truncateString (string: string, limit: number): string {
  if (string.length > limit) {
    return string.substring(0, limit) + '...'
  } else {
    return string
  }
}
