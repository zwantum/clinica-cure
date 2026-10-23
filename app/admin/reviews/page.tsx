'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Star,
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  X,
  Check,
  Award,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { LoadingState } from '../components/LoadingState'
import { EmptyState } from '../components/EmptyState'
import {
  fetchGoogleReviews,
  createGoogleReview,
  updateGoogleReview,
  deleteGoogleReview,
  AVATAR_PALETTES,
  computeInitials,
  pickAvatarClass,
} from '../services/reviews'
import { GoogleReviewRecord } from '../types'

export default function GoogleReviewsAdminPage() {
  const [reviews, setReviews] = useState<GoogleReviewRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<GoogleReviewRecord | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    time: 'Just now',
    rating: 5,
    text: '',
    avatarBg: AVATAR_PALETTES[0].class,
    verified: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  const loadReviews = async () => {
    setLoading(true)
    try {
      const data = await fetchGoogleReviews()
      setReviews(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReviews()

    const onUpdate = () => {
      loadReviews()
    }

    window.addEventListener('clinicacure_reviews_updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    window.addEventListener('focus', onUpdate)

    return () => {
      window.removeEventListener('clinicacure_reviews_updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
      window.removeEventListener('focus', onUpdate)
    }
  }, [])

  const handleOpenAddModal = () => {
    setEditingReview(null)
    setFormData({
      name: '',
      time: 'Just now',
      rating: 5,
      text: '',
      avatarBg: AVATAR_PALETTES[Math.floor(Math.random() * AVATAR_PALETTES.length)].class,
      verified: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (review: GoogleReviewRecord) => {
    setEditingReview(review)
    setFormData({
      name: review.name,
      time: review.time,
      rating: review.rating,
      text: review.text,
      avatarBg: review.avatarBg || pickAvatarClass(review.name),
      verified: review.verified !== undefined ? review.verified : true,
    })
    setIsModalOpen(true)
  }

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      showToast('Please enter both patient name and review content.')
      return
    }

    setIsSaving(true)
    try {
      if (editingReview) {
        await updateGoogleReview(editingReview.id, {
          name: formData.name.trim(),
          time: formData.time.trim() || 'Just now',
          initials: computeInitials(formData.name),
          avatarBg: formData.avatarBg,
          rating: Number(formData.rating) || 5,
          text: formData.text.trim(),
          verified: formData.verified,
        })
        showToast('Google review updated successfully!')
      } else {
        await createGoogleReview({
          name: formData.name.trim(),
          time: formData.time.trim() || 'Just now',
          initials: computeInitials(formData.name),
          avatarBg: formData.avatarBg,
          rating: Number(formData.rating) || 5,
          text: formData.text.trim(),
          verified: formData.verified,
          source: 'manual',
        })
        showToast('New review added and published live!')
      }
      setIsModalOpen(false)
      loadReviews()
    } catch {
      showToast('An error occurred while saving the review.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingId) return
    setIsDeleting(true)
    try {
      await deleteGoogleReview(deletingId)
      showToast('Review removed.')
      setDeletingId(null)
      loadReviews()
    } catch {
      showToast('Failed to delete review.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.text.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating =
      ratingFilter === 'all' || r.rating.toString() === ratingFilter

    return matchesSearch && matchesRating
  })

  // Metrics calculation
  const totalReviews = reviews.length
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0'
  const verifiedCount = reviews.filter((r) => r.verified !== false).length

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Google Reviews' }]} />

      <PageHeader
        title="Google Reviews Management"
        description="Manage live verified patient reviews and ratings displayed on the website."
        actions={
          <div className="flex items-center gap-2.5">
            <Link
              href="/#patient-stories"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#172033] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] rounded-lg shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5F6B7A]" />
              <span>View on Website</span>
            </Link>
            <button
              onClick={loadReviews}
              title="Refresh reviews"
              className="p-2 text-[#5F6B7A] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#f0c000] rounded-lg shadow-2xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Review</span>
            </button>
          </div>
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#172033] text-white text-xs font-semibold rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#FFCC00]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6B7A]">Total Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-[#F7F8FA] flex items-center justify-center text-[#172033]">
              <MessageSquare className="w-4 h-4 text-[#0E746D]" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold font-display text-[#172033]">{totalReviews}</p>
            <span className="text-[11px] text-[#5F6B7A]">Published on website</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6B7A]">Average Rating</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <p className="text-2xl font-bold font-display text-[#172033]">{avgRating}</p>
              <span className="text-xs font-bold text-amber-500">/ 5.0</span>
            </div>
            <span className="text-[11px] text-[#5F6B7A]">High patient satisfaction</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6B7A]">5-Star Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold font-display text-[#172033]">{fiveStarCount}</p>
            <span className="text-[11px] text-emerald-600 font-medium">
              {totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 100}% of all reviews
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5F6B7A]">Verified Patients</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#0E746D]">
              <Award className="w-4 h-4 text-[#0E746D]" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold font-display text-[#172033]">{verifiedCount}</p>
            <span className="text-[11px] text-[#5F6B7A]">With verification badge</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5EAF0] p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name or keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F8FA] border border-[#E5EAF0] rounded-lg text-[#172033] placeholder-[#8F9CAE] focus:outline-hidden focus:ring-1 focus:ring-[#0E746D] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-medium text-[#5F6B7A] shrink-0">Filter Rating:</span>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="text-xs bg-[#F7F8FA] border border-[#E5EAF0] rounded-lg px-3 py-2 text-[#172033] focus:outline-hidden focus:ring-1 focus:ring-[#0E746D]"
          >
            <option value="all">All Ratings ({reviews.length})</option>
            <option value="5">5 Stars only ({fiveStarCount})</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews Content Grid */}
      {loading ? (
        <LoadingState message="Loading Google reviews from live database..." />
      ) : filteredReviews.length === 0 ? (
        <EmptyState
          title="No reviews found"
          description={
            searchQuery || ratingFilter !== 'all'
              ? 'No reviews match your current filters. Try resetting search.'
              : 'No Google reviews available yet. Click "Add Review" to add the first patient testimonial.'
          }
          action={
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#f0c000] rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Review</span>
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review) => {
            const initials = review.initials || computeInitials(review.name)
            const avatarBg = review.avatarBg || pickAvatarClass(review.name)

            return (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-[#E5EAF0] p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full ${avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-[#172033] truncate">
                            {review.name}
                          </h4>
                          {review.verified !== false && (
                            <svg className="w-3.5 h-3.5 text-[#00A88F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[11px] text-[#8F9CAE] block mt-0.5">
                          {review.time || 'Recent'}
                        </span>
                      </div>
                    </div>

                    {/* Google G Brand Icon */}
                    <div className="shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs my-2.5">
                    {'★'.repeat(review.rating || 5)}
                  </div>

                  {/* Review text */}
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-4">
                    {review.text}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-semibold text-[#8F9CAE]">
                    {review.source === 'manual' ? 'Added via Admin' : 'Google Verified'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(review)}
                      className="p-1.5 text-[#5F6B7A] hover:text-[#0E746D] hover:bg-[#E8F6F4] rounded-md transition-colors"
                      title="Edit Review"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(review.id)}
                      className="p-1.5 text-[#5F6B7A] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5EAF0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#172033]">
                    {editingReview ? 'Edit Google Review' : 'Add Google Review'}
                  </h3>
                  <p className="text-xs text-[#5F6B7A]">
                    Review will immediately synchronize and reflect on the frontend.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#5F6B7A] hover:text-[#172033] hover:bg-[#F7F8FA] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveReview} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3 py-2 text-xs bg-[#F7F8FA] border border-[#E5EAF0] rounded-lg text-[#172033] focus:outline-hidden focus:ring-1 focus:ring-[#0E746D] focus:bg-white"
                  />
                </div>

                {/* Relative Time / Timestamp */}
                <div>
                  <label className="block text-xs font-semibold text-[#172033] mb-1">
                    Display Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 1 hour ago, 2 days ago, Just now"
                    className="w-full px-3 py-2 text-xs bg-[#F7F8FA] border border-[#E5EAF0] rounded-lg text-[#172033] focus:outline-hidden focus:ring-1 focus:ring-[#0E746D] focus:bg-white"
                  />
                </div>
              </div>

              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  Rating (Stars)
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: starVal })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= formData.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#172033] ml-2">
                    {formData.rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#172033]">
                    Review Text <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-[#8F9CAE]">
                    {formData.text.length} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Share the patient's feedback, experience, doctor mentioned..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F8FA] border border-[#E5EAF0] rounded-lg text-[#172033] focus:outline-hidden focus:ring-1 focus:ring-[#0E746D] focus:bg-white resize-y"
                />
              </div>

              {/* Avatar Background Color Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1.5">
                  Avatar Background Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_PALETTES.map((palette) => {
                    const isSelected = formData.avatarBg === palette.class
                    return (
                      <button
                        key={palette.class}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatarBg: palette.class })}
                        title={palette.name}
                        className={`w-7 h-7 rounded-full ${palette.class} flex items-center justify-center transition-transform hover:scale-110 ${
                          isSelected ? 'ring-2 ring-offset-2 ring-[#0E746D]' : ''
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Verified Toggle */}
              <div className="flex items-center justify-between p-3 bg-[#F7F8FA] rounded-xl border border-[#E5EAF0]">
                <div>
                  <span className="text-xs font-semibold text-[#172033] block">
                    Verified Google Patient Checkmark
                  </span>
                  <span className="text-[11px] text-[#5F6B7A]">
                    Show the teal verified badge next to the patient&apos;s name
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  className="w-4 h-4 text-[#0E746D] rounded border-[#CBD5E1] focus:ring-[#0E746D]"
                />
              </div>

              {/* Live Card Preview */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F6B7A] block mb-2">
                  Live Website Preview
                </span>
                <div className="bg-white rounded-xl p-4 border border-[#E2ECE9] shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full ${formData.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                      >
                        {computeInitials(formData.name || 'Patient')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-sm text-slate-800 truncate">
                            {formData.name || 'Patient Name'}
                          </h4>
                          {formData.verified && (
                            <svg className="w-3.5 h-3.5 text-[#00A88F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-[11px] text-[#94A3B8] block leading-tight mt-0.5">
                          {formData.time || 'Just now'}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400 text-xs my-2.5">
                    {'★'.repeat(formData.rating)}
                  </div>

                  <p className="text-[13px] text-[#475569] leading-relaxed">
                    {formData.text || 'Review message preview will appear here as you type...'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#f0c000] rounded-lg shadow-xs transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingReview ? 'Save Changes' : 'Publish Review'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-2xl p-6 max-w-sm w-full space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#172033]">Delete Review?</h3>
              <p className="text-xs text-[#5F6B7A] mt-1">
                Are you sure you want to remove this review? It will be removed from the frontend website immediately.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
