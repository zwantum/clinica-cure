import HeroBanner from '@/components/home/HeroBanner'
import QuickActions from '@/components/home/QuickActions'
import AboutSection from '@/components/home/AboutSection'
import StatsSection from '@/components/home/StatsSection'
import AppointmentSection from '@/components/home/AppointmentSection'
import DepartmentsSection from '@/components/home/DepartmentsSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import EmergencyBanner from '@/components/home/EmergencyBanner'
import PatientStoriesSection from '@/components/home/PatientStoriesSection'
import BlogUpdatesSection from '@/components/home/BlogUpdatesSection'
import FaqSection from '@/components/home/FaqSection'
import ContactSection from '@/components/home/ContactSection'

export const revalidate = 0

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Quick Action Cards (Overlapping Hero) */}
      <QuickActions />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Hospital Impact & Key Metrics */}
      <StatsSection />

      {/* 5. Health Info & Instant Booking Form + Symptoms Carousel */}
      <AppointmentSection />

      {/* 6. Medical Specialities / Departments (Auto-scrolling tabs with icons) */}
      <DepartmentsSection />

      {/* 7. Why Choose Clinica Cure */}
      <WhyChooseUs />

      {/* 8. 24x7 Emergency Call Banner */}
      <EmergencyBanner />

      {/* 9. Real Patient Recovery Stories & Google Reviews Masonry Wall */}
      <PatientStoriesSection />

      {/* 10. Health Insights & Hospital Blog (2 Big Cards + 3 Small Column Cards) */}
      <BlogUpdatesSection />

      {/* 11. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 12. Contact Info, Location & Inquiry Form */}
      <ContactSection />
    </div>
  )
}
