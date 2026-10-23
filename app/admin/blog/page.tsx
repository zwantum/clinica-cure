'use client'

import React, { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  BlogOverview,
  PostList,
  PostEditor,
  CategoryManager,
  AuthorManager,
  MediaLibrary,
  BlogSettingsView,
  CommentManager,
  TagManager,
  ToastContainer,
} from '@zwantum/blog/admin'
import { blogClient } from '@/lib/blogClient'
import type { Media, Post } from '@zwantum/blog-types'
import '@zwantum/blog-admin/styles.css'
import '@zwantum/blog-editor/styles.css'
import '@zwantum/blog-editor/content.css'
import './blog-admin-override.css'

function AdminBlogContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawView = searchParams.get('view') || 'posts'
  const id = searchParams.get('id') || ''

  // Fallback to 'posts' if edit-post is requested without an id
  const view = rawView === 'edit-post' && !id ? 'posts' : rawView

  // Media Picker Modal State (for PostEditor featured image and content insertion)
  const [showMediaPickerModal, setShowMediaPickerModal] = useState<boolean>(false)
  const [mediaPickerSelectCallback, setMediaPickerSelectCallback] = useState<((media: Media) => void) | null>(null)

  const handleOpenMediaPicker = (onSelect: (media: Media) => void) => {
    setMediaPickerSelectCallback(() => onSelect)
    setShowMediaPickerModal(true)
  }

  const navigateTo = (newView: string, postId?: string) => {
    const params = new URLSearchParams()
    params.set('view', newView)
    if (postId) {
      params.set('id', postId)
    }
    router.push(`/admin/blog?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-2xs p-3 sm:p-5 clinicacure-integrated-blog">
      {view === 'overview' && (
        <BlogOverview
          client={blogClient}
          onNavigateToPosts={() => navigateTo('posts')}
          onNavigateToNewPost={() => navigateTo('new-post')}
          onNavigateToEditPost={(postId) => navigateTo('edit-post', postId)}
        />
      )}

      {view === 'posts' && (
        <PostList
          client={blogClient}
          onNavigateToNewPost={() => navigateTo('new-post')}
          onNavigateToEditPost={(postId) => navigateTo('edit-post', postId)}
        />
      )}

      {view === 'new-post' && (
        <PostEditor
          key="new-post"
          client={blogClient}
          siteUrl={typeof window !== 'undefined' ? window.location.origin : undefined}
          basePath="/blog"
          onBack={() => navigateTo('posts')}
          onSaveSuccess={(savedPost: Post) => {
            navigateTo('edit-post', savedPost.id)
          }}
          onOpenMediaLibrary={handleOpenMediaPicker}
        />
      )}

      {view === 'edit-post' && (
        <PostEditor
          key={`edit-post-${id}`}
          client={blogClient}
          postId={id}
          siteUrl={typeof window !== 'undefined' ? window.location.origin : undefined}
          basePath="/blog"
          onBack={() => navigateTo('posts')}
          onSaveSuccess={(savedPost: Post) => {
            if (savedPost.id !== id) {
              navigateTo('edit-post', savedPost.id)
            }
          }}
          onOpenMediaLibrary={handleOpenMediaPicker}
        />
      )}

      {view === 'categories' && (
        <CategoryManager
          client={blogClient}
          siteUrl={typeof window !== 'undefined' ? window.location.origin : undefined}
          basePath="/blog"
        />
      )}

      {view === 'authors' && <AuthorManager client={blogClient} />}

      {view === 'media' && <MediaLibrary client={blogClient} />}

      {view === 'settings' && <BlogSettingsView client={blogClient} />}

      {view === 'comments' && <CommentManager client={blogClient} />}

      {view === 'tags' && (
        <TagManager
          client={blogClient}
          siteUrl={typeof window !== 'undefined' ? window.location.origin : undefined}
          basePath="/blog"
        />
      )}

      {/* Fallback for unknown view values */}
      {![
        'overview',
        'posts',
        'new-post',
        'edit-post',
        'categories',
        'authors',
        'media',
        'settings',
        'comments',
        'tags',
      ].includes(view) && (
        <PostList
          client={blogClient}
          onNavigateToNewPost={() => navigateTo('new-post')}
          onNavigateToEditPost={(postId) => navigateTo('edit-post', postId)}
        />
      )}

      {/* Media Picker Modal Dialog */}
      {showMediaPickerModal && (
        <div
          className="fixed inset-0 z-99999 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMediaPickerModal(false)
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-white flex-wrap gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 m-0">Media Library</h3>
                <p className="text-xs text-slate-500 m-0 mt-0.5">
                  Select an existing image from Supabase storage or upload a new one
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaPickerModal(false)}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-100 text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <MediaLibrary
                client={blogClient}
                onSelectMedia={(media) => {
                  mediaPickerSelectCallback?.(media)
                  setShowMediaPickerModal(false)
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Global Top-Right Push Notification Toast Container */}
      <ToastContainer />
    </div>
  )
}

export default function AdminBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-[#5F6B7A] bg-white rounded-xl border border-[#E5EAF0]">
          <div className="w-8 h-8 border-2 border-[#FFCC00] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold">Loading Blog Articles...</p>
        </div>
      }
    >
      <AdminBlogContent />
    </Suspense>
  )
}
