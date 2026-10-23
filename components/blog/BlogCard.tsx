import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/config/blogs'

interface BlogCardProps {
  post: BlogPost
}

function getAuthorInitials(name?: string): string {
  if (!name || !name.trim()) return 'SA'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 hover:border-[#0E746D]/40 transition-all duration-300 hover:shadow-[0_16px_36px_-10px_rgba(14,116,109,0.12)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Cover Image with Category & Reading Time Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Category Badge (Top Left) - only rendered if category is set */}
          {post.category ? (
            <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#0E746D] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {post.category}
            </div>
          ) : null}

          {/* Reading Time (Bottom Right) */}
          <div className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3 h-3 text-emerald-300" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 pb-2">
          {/* Date */}
          <div className="flex items-center text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1.5 text-[11.5px]">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.publishDate}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-display font-bold text-slate-900 text-lg sm:text-[19px] leading-snug group-hover:text-[#0E746D] transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="mt-2.5 text-[14px] sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer: Doctor Author + Action Button */}
      <div className="p-5 sm:p-6 pt-3">
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden ring-1 ring-[#0E746D]/20">
              {post.author.image ? (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold tracking-tight text-[11px]">
                  {getAuthorInitials(post.author.name)}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-slate-900 text-xs sm:text-[13px] truncate group-hover:text-[#0E746D] transition-colors">
                {post.author.name}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {post.author.designation}
              </p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="w-9 h-9 rounded-full bg-[#EAF7F4] text-[#0E746D] group-hover:bg-[#0E746D] group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0 shadow-2xs group-hover:translate-x-0.5"
            aria-label={`Read article: ${post.title}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
