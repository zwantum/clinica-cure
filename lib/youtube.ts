/**
 * YouTube utility helpers for extracting video IDs and generating embed/thumbnail URLs.
 */

export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') return null

  const trimmed = urlOrId.trim()

  // If already an 11-character alphanumeric ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed
  }

  // youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i)
  if (shortMatch && shortMatch[1]) return shortMatch[1]

  // youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/i)
  if (watchMatch && watchMatch[1]) return watchMatch[1]

  // youtube.com/embed/<id>
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i)
  if (embedMatch && embedMatch[1]) return embedMatch[1]

  // youtube.com/shorts/<id>
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i)
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1]

  return null
}

export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' = 'hq'): string {
  const id = extractYouTubeId(videoId) || videoId
  if (quality === 'maxres') {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export function getYouTubeEmbedUrl(videoId: string, autoplay = true): string {
  const id = extractYouTubeId(videoId) || videoId
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}
