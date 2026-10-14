import { DoctorRecord } from '../types'
import { SEED_DOCTORS } from '@/config/constants'

// Map existing 35 specialists into DoctorRecord format
const INITIAL_DOCTORS: DoctorRecord[] = SEED_DOCTORS.map((doc: any, idx: number) => {
  const deptSlug = doc.departments?.[0] || 'general-medicine'
  const deptName = deptSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())

  // Default expertise based on doctor specializations or fallbacks
  const defaultExpertise = (doc.specializations && doc.specializations.length > 0)
    ? doc.specializations.slice(0, 6).map((spec: string) => ({
        title: spec,
        description: `Comprehensive diagnostic interpretation, patient counseling and advanced ${spec.toLowerCase()} protocol.`,
      }))
    : [
        { title: 'Clinical Diagnosis', description: 'Comprehensive patient assessment and clinical diagnostic evaluation.' },
        { title: 'Specialist Consultation', description: 'Evidence-based therapeutic planning and ongoing disease management.' },
        { title: 'Advanced Procedural Care', description: 'Modern medical and surgical interventions with minimal downtime.' },
        { title: 'Preventive Follow-up', description: 'Long-term health monitoring and preventive counseling.' },
      ]

  return {
    id: `doc-${idx + 1}`,
    name: doc.name,
    slug: doc.slug,
    designation: doc.designation,
    department_name: deptName,
    department_slug: deptSlug,
    seniority_badge: 'Senior Consultant',
    experience_years: doc.experience?.includes('Year') ? doc.experience : '10+ Years',
    procedures_count: '5,000+',
    expertise_highlight: 'Advanced Clinical Expertise',
    care_approach: 'Patient-Centric Approach',
    metric_badges: [
      { title: doc.experience?.includes('Year') ? doc.experience : '10+ Years', subtitle: 'Years of Experience' },
      { title: '5,000+', subtitle: 'Procedures Done' },
      { title: 'Advanced Clinical Expertise', subtitle: 'Clinical Focus' },
      { title: 'Patient-Centric Approach', subtitle: 'Care Philosophy' },
    ],
    consultation_fee: 600,
    gender: doc.gender || 'Male',
    profile_image: doc.profile_image || (doc.gender === 'Female' ? '/images/doctors/doctor-female.svg' : '/images/doctors/doctor-male.svg'),
    is_active: doc.is_active ?? true,
    is_on_leave: doc.is_on_leave ?? false,
    qualifications: doc.qualifications || ['MBBS', 'MD'],
    short_title: doc.short_title || 'Consultant Specialist',
    short_bio: `${doc.name} is a dedicated ${doc.designation} at Clinica Cure Hospital, Ranchi. Known for clinical precision, patient-first care, and commitment to delivering the highest quality medical outcomes.`,
    bio: `${doc.name} brings high clinical precision, advanced procedural acumen, and a compassionate bedside approach to patient care at Clinica Cure Hospital, Bariatu, Ranchi. Holding qualifications in ${(doc.qualifications || ['MBBS', 'MD']).join(', ')}, ${doc.name} works closely with multidisciplinary teams to ensure timely and accurate diagnosis and care.`,
    quote: '“Accurate diagnosis is the first step towards the right treatment. My focus is to provide precise, patient-centered care with compassion and clarity.”',
    expertise: defaultExpertise,
    schedule_sessions: [
      { day: 'Monday – Friday', timings: '10:00 AM – 4:00 PM', type: 'Regular OPD Consultation', status: 'Available' },
      { day: 'Saturday', timings: '10:00 AM – 2:00 PM', type: 'Specialist & Review Clinic', status: 'Available' },
      { day: 'Sunday', timings: 'Not Available', type: '—', status: 'Unavailable' },
    ],
    faqs: [
      {
        question: `Do I need a prior appointment to consult ${doc.name}?`,
        answer: `While prior online or telephone booking is recommended to avoid waiting queues, walk-in consultations are also accommodated based on day-of OPD slot availability.`,
        sort_order: 1,
        is_published: true,
      },
      {
        question: 'What medical documents should I bring?',
        answer: 'Please carry your government ID, previous prescription slips, current medication lists, and past diagnostic reports (scans, blood tests, or discharge summaries).',
        sort_order: 2,
        is_published: true,
      },
      {
        question: 'Can I get a second opinion on a medical report?',
        answer: `Yes. ${doc.name} routinely provides objective, evidence-based second opinions for complex planned surgical, diagnostic, and medical treatments.`,
        sort_order: 3,
        is_published: true,
      },
      {
        question: 'What are the consultation timings and fees?',
        answer: 'Consultation fee is ₹600. Consultations are conducted during designated OPD shift hours at the Bariatu Road, Ranchi campus.',
        sort_order: 4,
        is_published: true,
      },
    ],
    cta_banner: {
      eyebrow: 'Clinica Cure Hospital',
      title: `Need a ${doc.department} Consultation?`,
      description: `Book an appointment with ${doc.name} and get accurate, expert clinical care.`,
      button_text: 'Book Appointment',
      button_url: '#book-appointment',
      image: '',
      features: ['Advanced Technology', 'Expert Diagnosis', 'Patient-Centric Care'],
    },
  }
})

let doctorsStore: DoctorRecord[] = [...INITIAL_DOCTORS]

export async function fetchDoctors(): Promise<DoctorRecord[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('clinicacure_admin_doctors')
    if (cached) {
      try {
        return JSON.parse(cached)
      } catch {
        // fallback
      }
    }
  }
  return doctorsStore
}

export async function getDoctorBySlug(slug: string): Promise<DoctorRecord | null> {
  const doctors = await fetchDoctors()
  return doctors.find((d) => d.slug === slug || d.id === slug) || null
}

export async function toggleDoctorLeave(slug: string): Promise<boolean> {
  doctorsStore = doctorsStore.map((doc) =>
    doc.slug === slug ? { ...doc, is_on_leave: !doc.is_on_leave } : doc
  )
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_doctors', JSON.stringify(doctorsStore))
    window.dispatchEvent(new CustomEvent('clinicacure_doctor_updated'))
  }
  return true
}

export async function toggleDoctorActive(slug: string): Promise<boolean> {
  doctorsStore = doctorsStore.map((doc) =>
    doc.slug === slug ? { ...doc, is_active: !doc.is_active } : doc
  )
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_doctors', JSON.stringify(doctorsStore))
    window.dispatchEvent(new CustomEvent('clinicacure_doctor_updated'))
  }
  return true
}

export async function saveDoctor(
  data: Partial<DoctorRecord> & { name: string; slug: string }
): Promise<DoctorRecord> {
  const existingIdx = doctorsStore.findIndex((d) => d.slug === data.slug)

  let savedDoc: DoctorRecord

  if (existingIdx >= 0) {
    savedDoc = { ...doctorsStore[existingIdx], ...data }
    doctorsStore[existingIdx] = savedDoc
  } else {
    savedDoc = {
      id: `doc-${Date.now()}`,
      name: data.name,
      slug: data.slug,
      designation: data.designation || 'Consultant Specialist',
      department_name: data.department_name || 'General Medicine',
      department_slug: data.department_slug || 'general-medicine',
      seniority_badge: data.seniority_badge || 'Senior Consultant',
      experience_years: data.experience_years || '10+ Years',
      procedures_count: data.procedures_count || '5,000+',
      expertise_highlight: data.expertise_highlight || 'Specialist Care',
      care_approach: data.care_approach || 'Patient-Centric Approach',
      metric_badges: data.metric_badges || [
        { title: data.experience_years || '10+ Years', subtitle: 'Years of Experience' },
        { title: data.procedures_count || '5,000+', subtitle: 'Procedures Done' },
        { title: data.expertise_highlight || 'Specialist Care', subtitle: 'Clinical Focus' },
        { title: data.care_approach || 'Patient-Centric Approach', subtitle: 'Care Philosophy' },
      ],
      consultation_fee: data.consultation_fee || 600,
      profile_image: data.profile_image || '/images/doctors/doctor-male.svg',
      is_active: data.is_active ?? true,
      is_on_leave: data.is_on_leave ?? false,
      qualifications: data.qualifications || ['MBBS', 'MD'],
      short_title: data.short_title || '',
      short_bio: data.short_bio || '',
      bio: data.bio || '',
      quote: data.quote || '',
      expertise: data.expertise || [],
      schedule_sessions: data.schedule_sessions || [],
      faqs: data.faqs || [],
      cta_banner: data.cta_banner || {
        eyebrow: 'Clinica Cure Hospital',
        title: `Need a ${data.department_name || 'Specialist'} Consultation?`,
        description: `Book an appointment with ${data.name} and get accurate, expert clinical care.`,
        button_text: 'Book Appointment',
        button_url: '#book-appointment',
        image: '',
        features: ['Advanced Technology', 'Expert Diagnosis', 'Patient-Centric Care'],
      },
    }
    doctorsStore = [savedDoc, ...doctorsStore]
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_doctors', JSON.stringify(doctorsStore))
    window.dispatchEvent(new CustomEvent('clinicacure_doctor_updated'))
  }

  return savedDoc
}
