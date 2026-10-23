import { NextResponse } from 'next/server'
import { GoogleReviewRecord } from '@/app/admin/types'

const INITIAL_REVIEWS: GoogleReviewRecord[] = [
  {
    id: 'rev-01',
    name: 'Md Niyaj',
    time: '1 hour ago',
    initials: 'Md',
    avatarBg: 'bg-[#4338CA]',
    rating: 5,
    text: 'Best care best hospital,',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'rev-02',
    name: 'Nasrin Prween',
    time: '2 days ago',
    initials: 'N',
    avatarBg: 'bg-[#15803D]',
    rating: 5,
    text: 'Dr aftab sir bahut acha doctor hai, acha ilaj hua, staff acha hai, patient ka diet acha provide kiya jata h, physio available hai...',
    hasReadMore: true,
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'rev-03',
    name: 'Yasmin Parween',
    time: '8 days ago',
    initials: 'Y',
    avatarBg: 'bg-[#334155]',
    rating: 5,
    text: 'Best orthopedic surgeon dr.satyendra , best hospital,fecelity Good',
    hasReadMore: true,
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: 'rev-04',
    name: 'naushad ali',
    time: '11 days ago',
    initials: 'N',
    avatarBg: 'bg-[#B45309]',
    rating: 5,
    text: 'Best hospital,dr aftab and dr altamash both are good consultant, good care of patients, staffs behaviour also very friendly',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 11).toISOString(),
  },
  {
    id: 'rev-05',
    name: 'Sanouwer Shah...',
    time: '1 day ago',
    initials: 'S',
    avatarBg: 'bg-[#065F46]',
    rating: 5,
    text: 'This place provided great comprehensive care to the patient, staff was competent and efficient.',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'rev-06',
    name: 'Hujaifa Ansari',
    time: '3 days ago',
    initials: 'H',
    avatarBg: 'bg-[#D97706]',
    rating: 5,
    text: 'Best for emergency patients',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'rev-07',
    name: 'Mahendara Ram',
    time: '6 days ago',
    initials: 'M',
    avatarBg: 'bg-[#166534]',
    rating: 5,
    text: 'Very good treatment, best doctor available,best staff , highly recommend',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: 'rev-08',
    name: 'Rabul Alam',
    time: '10 days ago',
    initials: 'R',
    avatarBg: 'bg-[#DB2777]',
    rating: 5,
    text: 'Best hospital, dr.aftab sir best doctor, best treatment,',
    hasReadMore: true,
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'rev-09',
    name: 'Anayat Husen',
    time: '1 day ago',
    initials: 'A',
    avatarBg: 'bg-[#BE123C]',
    rating: 5,
    text: 'Good care and treatment,dr aftab best doctor in ranchi',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'rev-10',
    name: 'Mumtaz Ahmad',
    time: '3 days ago',
    initials: 'M',
    avatarBg: 'bg-[#57534E]',
    rating: 5,
    text: 'Best hospital best doctor available highly recomended',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'rev-11',
    name: 'Adib Khan',
    time: '8 days ago',
    initials: 'A',
    avatarBg: 'bg-[#7C3AED]',
    rating: 5,
    text: 'Best hospital',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: 'rev-12',
    name: 'Naushad Alam',
    time: '10 days ago',
    initials: 'N',
    avatarBg: 'bg-[#0284C7]',
    rating: 5,
    text: 'Doctors facility and all hospitals staff are very good and best treatment from here.',
    hasReadMore: true,
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'rev-13',
    name: 'ATISID PROPER...',
    time: '12 days ago',
    initials: 'A',
    avatarBg: 'bg-[#0F766E]',
    rating: 5,
    text: 'Best hospital and friendly staff',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: 'rev-14',
    name: 'Mohsin Akhtar',
    time: '1 day ago',
    initials: 'M',
    avatarBg: 'bg-[#92400E]',
    rating: 5,
    text: 'very good',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'rev-15',
    name: 'Nisar Ansari',
    time: '2 days ago',
    initials: 'N',
    avatarBg: 'bg-[#EA580C]',
    rating: 5,
    text: 'Best treatment given by dr. Aftab Alam and dr altamash sir..',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'rev-16',
    name: 'Shubham Saurav',
    time: '5 days ago',
    initials: 'S',
    avatarBg: 'bg-[#2563EB]',
    rating: 5,
    text: "It's good .. economical ..dr Aftam alam is very good",
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'rev-17',
    name: 'Talib Ansari',
    time: '10 days ago',
    initials: 'T',
    avatarBg: 'bg-[#115E59]',
    rating: 5,
    text: 'Very good',
    hasReadMore: true,
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'rev-18',
    name: 'Sudhir Munda',
    time: '13 days ago',
    initials: 'S',
    avatarBg: 'bg-[#C2410C]',
    rating: 5,
    text: 'Hospital best hai,Mera marij amrita ka ilaj doctor Aftab Alam ne kiya...',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 13).toISOString(),
  },
  {
    id: 'rev-19',
    name: 'Zuber Khan',
    time: '2 days ago',
    initials: 'Z',
    avatarBg: 'bg-[#D97706]',
    rating: 5,
    text: 'Treatment was very good, dr Aftab sir and dr altamash both are good consultant, very satisfied with the treatment',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'rev-20',
    name: 'Saraswati Kumari',
    time: '3 days ago',
    initials: 'S',
    avatarBg: 'bg-[#6D28D9]',
    rating: 5,
    text: 'Dr aftab alam ka treatment acha hai best hospital',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'rev-21',
    name: 'Ansulika Ansu',
    time: '9 days ago',
    initials: 'A',
    avatarBg: 'bg-[#0F766E]',
    rating: 5,
    text: 'Doctors are good and helpful I had 6-7 days in ICU the process was smooth . Only suggestion I would give to have extra...',
    hasReadMore: true,
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
  },
  {
    id: 'rev-22',
    name: 'Suraj kumar Si...',
    time: '11 days ago',
    initials: 'S',
    avatarBg: 'bg-[#0D9488]',
    rating: 5,
    text: 'My patient is treated Under Dr Syed Altamash and Dr Aftab, very good recovery',
    verified: true,
    source: 'google',
    created_at: new Date(Date.now() - 86400000 * 11).toISOString(),
  },
]

// Server-side in-memory reviews cache
let reviewsStore: GoogleReviewRecord[] = [...INITIAL_REVIEWS]

export async function GET() {
  return NextResponse.json({
    success: true,
    reviews: reviewsStore,
    total: reviewsStore.length,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body.name || !body.text) {
      return NextResponse.json(
        { success: false, error: 'Name and review text are required' },
        { status: 400 }
      )
    }

    const newReview: GoogleReviewRecord = {
      id: body.id || `rev-${Date.now()}`,
      name: body.name.trim(),
      time: body.time?.trim() || 'Just now',
      initials: body.initials?.trim() || body.name.trim().slice(0, 2).toUpperCase(),
      avatarBg: body.avatarBg || 'bg-[#2563EB]',
      rating: Number(body.rating) || 5,
      text: body.text.trim(),
      verified: body.verified !== undefined ? Boolean(body.verified) : true,
      hasReadMore: body.text.trim().length > 110,
      source: body.source || 'manual',
      created_at: new Date().toISOString(),
    }

    // Add to top of list so newest shows first
    reviewsStore.unshift(newReview)

    return NextResponse.json({
      success: true,
      review: newReview,
      reviews: reviewsStore,
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Invalid request payload'
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required' }, { status: 400 })
    }

    const index = reviewsStore.findIndex((r) => r.id === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 })
    }

    reviewsStore[index] = {
      ...reviewsStore[index],
      ...updates,
      id, // keep immutable id
    }

    return NextResponse.json({
      success: true,
      review: reviewsStore[index],
      reviews: reviewsStore,
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to update review'
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required' }, { status: 400 })
    }

    reviewsStore = reviewsStore.filter((r) => r.id !== id)

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
      reviews: reviewsStore,
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to delete review'
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}
