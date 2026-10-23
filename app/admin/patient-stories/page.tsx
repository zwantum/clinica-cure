'use client'

import React, { useState, useEffect } from 'react'
import {
  Video,
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Play,
  X,
  Check,
  Award,
  Sparkles,
  Eye,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { LoadingState } from '../components/LoadingState'
import { EmptyState } from '../components/EmptyState'
import { PatientStoryRecord } from '../types'
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '@/lib/youtube'

export default function PatientStoriesAdminPage() {
  const [stories, setStories] = useState<PatientStoryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('all')

  // Modal State for Add / Replace
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<PatientStoryRecord | null>(null)
  const [formData, setFormData] = useState({
    patient_name: '',
    condition: '',
    outcome: '',
    department: 'General Care',
    description: '',
    video_url: '',
    thumbnail: '',
    sort_order: 0,
    is_active: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Preview Video Modal State
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null)

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  const loadStories = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/patient-stories', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data?.stories)) {
          setStories(data.stories)
        }
      }
    } catch (err) {
      console.warn('Could not load stories:', err)
      showToast('Could not load video stories from server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStories()
  }, [])

  const handleOpenAddModal = () => {
    setEditingStory(null)
    setFormData({
      patient_name: '',
      condition: '',
      outcome: '',
      department: 'General Care',
      description: '',
      video_url: '',
      thumbnail: '',
      sort_order: stories.length + 1,
      is_active: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (story: PatientStoryRecord) => {
    setEditingStory(story)
    setFormData({
      patient_name: story.patient_name || '',
      condition: story.condition || '',
      outcome: story.outcome || '',
      department: story.department || 'General Care',
      description: story.description || '',
      video_url: story.video_url || '',
      thumbnail: story.thumbnail || '',
      sort_order: story.sort_order || 0,
      is_active: story.is_active !== false,
    })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.video_url.trim()) {
      showToast('Please enter a YouTube video URL.')
      return
    }

    const ytId = extractYouTubeId(formData.video_url)
    if (!ytId) {
      showToast('Please enter a valid YouTube video link or video ID.')
      return
    }

    setIsSaving(true)
    try {
      const finalThumbnail = formData.thumbnail.trim() || getYouTubeThumbnail(ytId)

      if (editingStory) {
        // Update existing story
        const res = await fetch('/api/patient-stories', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingStory.id,
            patient_name: formData.patient_name.trim(),
            condition: formData.condition.trim(),
            outcome: formData.outcome.trim(),
            department: formData.department.trim(),
            description: formData.description.trim() || null,
            video_url: formData.video_url.trim(),
            thumbnail: finalThumbnail,
            sort_order: Number(formData.sort_order) || 0,
            is_active: formData.is_active,
          }),
        })

        const result = await res.json()
        if (!res.ok || !result.success) {
          throw new Error(result.error || 'Failed to update story')
        }

        setStories((prev) =>
          prev.map((s) => (s.id === editingStory.id ? result.story : s))
        )
        showToast('Video details updated successfully!')
      } else {
        // Create new story
        const res = await fetch('/api/patient-stories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patient_name: formData.patient_name.trim(),
            condition: formData.condition.trim(),
            outcome: formData.outcome.trim(),
            department: formData.department.trim(),
            description: formData.description.trim() || null,
            video_url: formData.video_url.trim(),
            thumbnail: finalThumbnail,
            sort_order: Number(formData.sort_order) || 0,
            is_active: formData.is_active,
          }),
        })

        const result = await res.json()
        if (!res.ok || !result.success) {
          throw new Error(result.error || 'Failed to add video')
        }

        setStories((prev) => [...prev, result.story])
        showToast('New video story published successfully!')
      }

      setIsModalOpen(false)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving video'
      showToast(msg)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/patient-stories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete story')
      }

      setStories((prev) => prev.filter((s) => s.id !== id))
      showToast('Video story deleted successfully.')
      setDeletingId(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error deleting story'
      showToast(msg)
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtered stories
  const filteredStories = stories.filter((s) => {
    const matchesSearch =
      s.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.outcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDept = selectedDept === 'all' || s.department === selectedDept

    return matchesSearch && matchesDept
  })

  // Unique departments for filter
  const departments = Array.from(new Set(stories.map((s) => s.department).filter(Boolean)))

  const previewYtId = extractYouTubeId(formData.video_url)

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#172033] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-[#2D3748] animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '/admin/overview' },
              { label: 'Patient Stories (Videos)' },
            ]}
          />
          <h1 className="text-2xl font-bold text-[#172033] mt-1 flex items-center gap-2.5">
            <Video className="w-7 h-7 text-[#00A88F]" />
            Patient Stories & Video Testimonials
          </h1>
          <p className="text-sm text-[#718096] mt-0.5">
            Manage the YouTube video testimonials and recovery stories displayed on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadStories}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Refresh videos from database"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#00A88F] hover:bg-[#008f7a] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Video
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5EAF0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient, surgery or topic..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Video Grid Cards */}
      {loading ? (
        <LoadingState message="Loading hospital video stories from Supabase..." />
      ) : filteredStories.length === 0 ? (
        <EmptyState
          icon={<Video className="w-6 h-6 text-[#A0AEC0]" />}
          title="No video stories found"
          description={
            searchQuery
              ? 'No videos matched your search query. Try another keyword.'
              : 'Add your first YouTube patient testimonial or hospital video now.'
          }
          action={
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="mt-2 px-4 py-2 bg-[#00A88F] hover:bg-[#008f7a] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Add Video Story
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStories.map((story, idx) => {
            const ytId = extractYouTubeId(story.video_url)
            const thumb = story.thumbnail || (ytId ? getYouTubeThumbnail(ytId) : '/images/patient-stories-hero-clean.webp')

            return (
              <div
                key={story.id}
                className="bg-white rounded-xl border border-[#E5EAF0] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Video Thumbnail Header with Play overlay */}
                <div className="relative aspect-video bg-black overflow-hidden group/thumb cursor-pointer">
                  <img
                    src={thumb}
                    alt={story.patient_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                  />
                  <div
                    onClick={() => setPreviewVideoUrl(story.video_url)}
                    className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover/thumb:bg-black/50"
                  >
                    <span className="w-12 h-12 rounded-full bg-white/95 text-[#00A88F] flex items-center justify-center shadow-lg transition-transform group-hover/thumb:scale-110">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </span>
                  </div>

                  {/* Order Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 text-white text-[11px] font-bold">
                    #{story.sort_order || idx + 1}
                  </span>

                  {/* Active Status Badge */}
                  <span
                    className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      story.is_active
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-600 text-white'
                    }`}
                  >
                    {story.is_active ? 'Live on Site' : 'Hidden'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {story.department && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A88F] bg-[#00A88F]/10 px-2 py-0.5 rounded">
                        {story.department}
                      </span>
                    )}

                    <h3 className="font-bold text-slate-900 text-base mt-2 line-clamp-1">
                      {story.patient_name}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 mt-0.5 line-clamp-1">
                      {story.condition}
                    </p>

                    {/* Outcome Badge */}
                    {story.outcome && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-md w-fit font-medium">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{story.outcome}</span>
                      </div>
                    )}

                    {story.description && (
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {story.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setPreviewVideoUrl(story.video_url)}
                      className="text-xs font-semibold text-slate-600 hover:text-[#00A88F] flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(story)}
                        className="p-1.5 text-slate-500 hover:text-[#00A88F] hover:bg-slate-100 rounded-md transition-colors"
                        title="Edit or replace video link"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingId(story.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#00A88F]" />
                {editingStory ? 'Edit or Replace Video Story' : 'Add New Patient Video Story'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              {/* YouTube Video URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  YouTube Video Link <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Accepts standard links, youtu.be short links, and YouTube Shorts.
                </p>
              </div>

              {/* Real-time YouTube Preview */}
              {previewYtId && (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 shadow-inner group">
                  <img
                    src={getYouTubeThumbnail(previewYtId)}
                    alt="YouTube Video Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/95 text-[#00A88F] flex items-center justify-center shadow-md">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/80 text-white px-1.5 py-0.5 rounded">
                    Auto-Detected ID: {previewYtId}
                  </span>
                </div>
              )}

              {/* Patient / Doctor Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Patient or Speaker Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Rajesh Kumar or Dr. Tarique Jameel Hasan"
                  value={formData.patient_name}
                  onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
                />
              </div>

              {/* Condition / Treatment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Condition / Surgery / Topic <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robotic Knee Replacement or Brain & Spine Problems"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
                />
              </div>

              {/* Two Column Row: Outcome Badge & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Outcome Highlight / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Recovered in 6 Weeks"
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Orthopedics, Neurosurgery"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brief Description or Clinical Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Short patient journey summary displayed in details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F] resize-none"
                />
              </div>

              {/* Display Order & Active Toggle */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A88F]/20 focus:border-[#00A88F]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isActiveToggle"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-[#00A88F] rounded border-slate-300 focus:ring-[#00A88F]"
                  />
                  <label htmlFor="isActiveToggle" className="text-xs font-semibold text-slate-700 select-none">
                    Visible on Live Website
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#00A88F] hover:bg-[#008f7a] text-white text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : editingStory ? (
                    'Save & Replace'
                  ) : (
                    'Publish Video Story'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-black rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-800">
            <button
              type="button"
              onClick={() => setPreviewVideoUrl(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={getYouTubeEmbedUrl(previewVideoUrl, true)}
                title="YouTube Video Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center">Delete Video Story?</h3>
            <p className="text-xs text-slate-500 text-center mt-1 leading-relaxed">
              Are you sure you want to remove this video testimonial from the homepage playlist? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deletingId)}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
