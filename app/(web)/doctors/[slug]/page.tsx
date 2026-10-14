import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEED_DOCTORS } from '@/config/constants'
import { departments } from '@/config/navigation'
import { DoctorProfileView } from '@/components/doctors/DoctorProfileView'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doctor = SEED_DOCTORS.find((d) => d.slug === slug)
  if (!doctor) return { title: 'Doctor Not Found | Clinica Cure Hospital' }

  return {
    title: `${doctor.name} - ${doctor.designation} | Clinica Cure Hospital`,
    description: `Consult ${doctor.name} (${(doctor.qualifications || []).join(
      ', '
    )}), ${doctor.designation} at Clinica Cure Hospital, Bariatu Road, Ranchi.`,
  }
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { slug } = await params
  const doctor = SEED_DOCTORS.find((d) => d.slug === slug)

  if (!doctor) {
    notFound()
  }

  // Primary department
  const primaryDeptSlug = doctor.departments?.[0] || 'general-medicine'
  const departmentObj =
    departments.find(
      (d) => d.slug === primaryDeptSlug || d.aliases?.includes(primaryDeptSlug)
    ) || null

  return (
    <DoctorProfileView
      initialDoctor={doctor}
      allDoctors={SEED_DOCTORS}
      department={departmentObj}
    />
  )
}
