'use client'

import { useState } from 'react'
import { Check, Copy, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'

interface BlogShareBarProps {
  title: string
  slug: string
}

export default function BlogShareBar({ title, slug }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false)

  // Always use deterministic canonical URL for SSR and hydration matching
  const canonicalUrl = `${siteConfig.siteUrl}/blog/${slug}`

  const handleCopy = () => {
    const copyUrl = typeof window !== 'undefined' ? window.location.href : canonicalUrl
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(copyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${title}\n${canonicalUrl}`)}`
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonicalUrl)}`
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
        Share:
      </span>

      {/* WhatsApp */}
      <a
        href={shareWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      {/* Twitter / X */}
      <a
        href={shareTwitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Share on X (Twitter)"
        title="Share on X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={shareFacebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className={`px-3 h-9 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
          copied
            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>
    </div>
  )
}
