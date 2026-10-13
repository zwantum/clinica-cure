'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  BriefcaseMedical,
  HeartHandshake,
  Bone,
  Baby,
  Brain,
  Activity,
  Scan,
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Droplets,
  Layers,
  Eye,
  Wind,
  Microscope,
  ShieldCheck,
  Scissors,
  Smile,
  type LucideIcon,
} from 'lucide-react'

interface DepartmentItem {
  id: string
  name: string
  icon: LucideIcon
  desc: string
  points: string[]
  image: string
}

const DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    icon: Stethoscope,
    desc: 'Our Department of General Medicine provides comprehensive care for acute and chronic conditions. From fever and viral illnesses to lifestyle diseases like diabetes and hypertension, our senior physicians ensure accurate clinical management.',
    points: [
      'Diagnosis & Treatment of Acute & Chronic Illnesses',
      'Diabetes & Hypertension Care',
      'Fever & Infection Management',
      'Heart & Chest Disorder Evaluation',
      'Preventive Health Screenings',
      'Continuous Medical Follow-up',
    ],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'orthopedics-joint-replacement',
    name: 'Orthopedics & Joint Replacement',
    icon: Bone,
    desc: 'Our orthopaedic and joint replacement team specialises in total knee & hip replacement, sports arthroscopy, complex fracture fixations, and dedicated physical rehabilitation.',
    points: [
      'Total Knee & Hip Replacement (TKR & THR)',
      'Arthroscopic Sports Surgery (ACL / Meniscus)',
      'Complex Trauma & Fracture Care',
      'Spine & Back Pain Care',
      'Arthritis & Geriatric Joint Health',
      'Postoperative Physiotherapy',
    ],
    image: 'https://images.unsplash.com/photo-1579156412503-f22426cc6386?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    icon: Brain,
    desc: 'Advanced surgical interventions for the brain and spine, featuring endoscopic brain surgery, skull base procedures, minimally invasive spine surgery, and 24x7 neurotrauma ICU support.',
    points: [
      'Brain & Spine Tumour Surgeries',
      'Endoscopic Brain & Spine Procedures',
      'Head & Spine Trauma Critical Care',
      'Hydrocephalus & Shunt Surgery',
      'Minimally Invasive Spine Decompression',
      'Neuro-Rehabilitation Support',
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: Heart,
    desc: 'Comprehensive cardiovascular care covering interventional cardiology, coronary angiography, heart failure management, arrhythmia evaluation, and preventive heart screening.',
    points: [
      'Coronary Angiography & Angioplasty',
      'Heart Failure & Cardiomyopathy Care',
      'Cardiac Arrhythmias & Pacemaker Clinic',
      '2D Echocardiography & ECG',
      'Preventive Cardiac Risk Assessments',
      'Cardiac Critical Care Support',
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'general-laparoscopic-surgery',
    name: 'General & Laparoscopic Surgery',
    icon: BriefcaseMedical,
    desc: 'Our surgical team performs advanced minimal access laparoscopic and laser procedures, ensuring smaller incisions, minimal scarring, and rapid recovery.',
    points: [
      'Laparoscopic Gallbladder & Appendix Surgery',
      'Advanced Inguinal & Ventral Hernia Repair',
      'Laser Surgery for Piles, Fissure & Fistula',
      'Metabolic & Minimal Access Surgery',
      'Emergency Trauma & Abdominal Surgery',
      'Comprehensive Pre & Post-Op Care',
    ],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'obstetrics-gynecology',
    name: 'Obstetrics & Gynecology',
    icon: HeartHandshake,
    desc: 'From routine maternity care and painless deliveries to high-risk pregnancies, infertility workups, and minimally invasive gynaec surgery, our team supports women with compassionate care.',
    points: [
      'High-Risk Pregnancy Management',
      'Normal & Caesarean Deliveries',
      'Infertility Evaluation & Treatment',
      'Gynaecological Laparoscopy',
      'PCOS & Hormonal Imbalance Clinic',
      'Antenatal & Postnatal Mother Care',
    ],
    image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'anaesthesia-critical-care',
    name: 'Anaesthesia & Critical Care',
    icon: Activity,
    desc: 'Equipped with multi-parameter monitors, advanced ventilators, and dedicated intensivists, our Critical Care Unit delivers round-the-clock life-saving stabilization.',
    points: [
      '24x7 Multi-Bed Intensive Care Unit (ICU)',
      'Advanced Mechanical Ventilation Support',
      'Emergency Trauma & Sepsis Resuscitation',
      'General & Regional Surgical Anaesthesia',
      'Invasive Hemodynamic Monitoring',
      'Postoperative High-Dependency Care',
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: Brain,
    desc: 'Dedicated neurology care for acute stroke management, epilepsy, chronic migraines, neuropathies, Parkinson’s disease, and neuromuscular disorders.',
    points: [
      'Acute Stroke Protocol & Thrombolysis',
      'Comprehensive Epilepsy & Seizure Care',
      'Headache & Migraine Specialist Clinic',
      'Parkinson’s & Movement Disorder Management',
      'Peripheral Neuropathy Diagnostics',
      'Neuro-Electrophysiology Coordination',
    ],
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'reconstructive-plastic-surgery',
    name: 'Reconstructive Plastic Surgery',
    icon: Scissors,
    desc: 'Super-specialised care for facial trauma, burn contracture releases, microvascular reconstruction, complex wound coverage, and aesthetic enhancements.',
    points: [
      'Burns & Post-Burn Deformity Correction',
      'Craniofacial & Facial Trauma Surgery',
      'Microvascular Flap & Hand Surgery',
      'Aesthetic & Cosmetic Procedures',
      'Scar Revision & Tissue Coverage',
      'Nerve & Tendon Repair',
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'oral-maxillofacial-surgery',
    name: 'Oral & Maxillofacial Surgery',
    icon: Smile,
    desc: 'Specialised surgical treatment for facial trauma, jaw fractures, impacted wisdom teeth, dental implants, and corrective jaw orthognathic surgery.',
    points: [
      'Maxillofacial Trauma & Jaw Fracture Fixation',
      'Surgical Wisdom Tooth Extractions',
      'Dental Implants & Bone Grafting',
      'Corrective Jaw (Orthognathic) Surgery',
      'Oral Cyst & Pathology Management',
      'Root Canal & Full Mouth Rehabilitation',
    ],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'urology',
    name: 'Urology',
    icon: Droplets,
    desc: 'Advanced endourology and laparoscopic urology for kidney stones, prostate enlargement, urologic cancers, and male infertility.',
    points: [
      'Laser Kidney Stone Surgery (PCNL / URSL)',
      'Prostate Disease & BPH Management (TURP)',
      'Urologic Oncology (Kidney, Prostate, Bladder)',
      'Laparoscopic Urological Procedures',
      'Urethral Stricture Reconstruction',
      'Male Infertility & Andrology Care',
    ],
    image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pediatric-neonatal',
    name: 'Pediatric & Neonatal',
    icon: Baby,
    desc: 'Compassionate pediatric and neonatal healthcare for newborns, infants, and children, backed by neonatal intensive care (NICU) and routine vaccination programs.',
    points: [
      'Neonatal Intensive Care (NICU)',
      'Pediatric Clinical Nutrition',
      'Childhood Infection & Fever Management',
      'Growth & Developmental Milestone Tracking',
      'Complete Immunization & Vaccination',
      'Emergency Pediatric Resuscitation',
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    icon: Activity,
    desc: 'Comprehensive diagnostic and therapeutic gastrointestinal care for liver conditions, acid peptic diseases, IBD, and gastrointestinal bleeding.',
    points: [
      'Diagnostic & Therapeutic Upper GI Endoscopy',
      'Colonoscopy & Polypectomy',
      'Hepatology & Chronic Liver Disease Care',
      'Inflammatory Bowel Disease (IBD) Clinic',
      'GI Bleed Emergency Management',
      'Acid Reflux & Peptic Ulcer Treatments',
    ],
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    icon: Wind,
    desc: 'Dedicated respiratory and chest medicine for asthma, chronic obstructive pulmonary disease (COPD), tuberculosis, pneumonia, and sleep apnea.',
    points: [
      'Asthma & Allergy Specialist Clinic',
      'COPD & Emphysema Management',
      'Tuberculosis Diagnosis & Treatment',
      'Diagnostic Bronchoscopy',
      'Pneumonia & Chest Infection Protocols',
      'Sleep Apnea & Pulmonary Function Tests',
    ],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    icon: Eye,
    desc: 'Advanced eye clinic offering sutureless phacoemulsification cataract surgery, glaucoma screening, diabetic eye care, and comprehensive refraction checkups.',
    points: [
      'Phacoemulsification Cataract Surgery',
      'Glaucoma Diagnosis & Medical Care',
      'Diabetic Retinopathy Screening',
      'Refractive Errors & Eye Health Checkup',
      'Cornea & Ocular Surface Disorders',
      'Pediatric Eye Screenings',
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'radiology',
    name: 'Radiology',
    icon: Scan,
    desc: 'Modern diagnostic imaging equipped with high-resolution ultrasound, colour Doppler, digital X-Ray, and round-the-clock clinical reporting.',
    points: [
      'High-Resolution Digital X-Ray',
      'Ultrasound & Colour Doppler Imaging',
      'CT & MRI Diagnostic Coordination',
      'Image-Guided Biopsies & Aspirations',
      'Prompt & Accurate Teleradiology Reporting',
      '24x7 Emergency Radiology Services',
    ],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: Layers,
    desc: 'Specialised clinical dermatology, venereology (STD) care, eczema, psoriasis, vitiligo, and aesthetic skin and hair therapies.',
    points: [
      'Clinical Dermatology & Skin Infection Care',
      'STD & Venereology Management',
      'Psoriasis, Vitiligo & Eczema Clinics',
      'Acne & Pigmentation Therapies',
      'Laser & Aesthetic Dermatology',
      'Hair Fall & Scalp Disorders',
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'microbiology-pathology',
    name: 'Microbiology & Pathology',
    icon: Microscope,
    desc: 'Fully automated diagnostic lab offering clinical biochemistry, histopathology, cytopathology (FNAC), hematology, and infectious disease serology.',
    points: [
      'Automated Hematology & Biochemistry',
      'Histopathology & Surgical Biopsies',
      'Cytology & Fine Needle Aspiration (FNAC)',
      'Clinical Microbiology & Culture Tests',
      'Diabetes & HbA1c Monitoring',
      'Rapid Turnaround Emergency Lab Services',
    ],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'preventive-medicine',
    name: 'Preventive Medicine',
    icon: ShieldCheck,
    desc: 'Comprehensive preventive health packages, metabolic screenings, adult and pediatric vaccinations, and lifestyle medicine guidance.',
    points: [
      'Full Body Executive Health Packages',
      'Lifestyle & Diabetes Risk Assessments',
      'Adult & Pediatric Vaccinations',
      'Hypertension & Obesity Management',
      'Pre-Employment & Corporate Health Checks',
      'Dietary & Nutritional Counselling',
    ],
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    icon: Droplets,
    desc: 'Specialised kidney care focused on chronic kidney disease (CKD), acute renal failure, hypertension management, and hemodialysis support.',
    points: [
      'Chronic Kidney Disease (CKD) Management',
      'Hemodialysis Support Coordination',
      'Acute Kidney Injury & Renal Failure Care',
      'Diabetic & Hypertensive Nephropathy Clinic',
      'Kidney Stone Prevention Protocols',
      'Electrolyte & Acid-Base Imbalance Care',
    ],
    image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80',
  },
]

export default function DepartmentsSection() {
  const [activeId, setActiveId] = useState(DEPARTMENTS[0].id)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isPausedRef = useRef(false)
  const isVisibleRef = useRef(true)

  const activeIndex = DEPARTMENTS.findIndex((d) => d.id === activeId)

  // Scroll active tab into view smoothly within the horizontal scroll container
  const scrollTabIntoView = useCallback((deptId: string) => {
    if (!tabsContainerRef.current) return
    const container = tabsContainerRef.current
    const activeBtn = container.querySelector(`[data-dept="${deptId}"]`) as HTMLElement | null
    if (activeBtn) {
      const containerWidth = container.clientWidth
      const tabLeft = activeBtn.offsetLeft
      const tabWidth = activeBtn.clientWidth
      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: 'smooth',
      })
    }
  }, [])

  const handleSelectDept = useCallback((deptId: string) => {
    setActiveId(deptId)
    scrollTabIntoView(deptId)
  }, [scrollTabIntoView])

  // Scroll arrows
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // IntersectionObserver to observe visibility of department section
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-rotation every 5000ms
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isVisibleRef.current || isPausedRef.current) return
      setActiveId((currentId) => {
        const currIdx = DEPARTMENTS.findIndex((d) => d.id === currentId)
        const nextIdx = (currIdx + 1) % DEPARTMENTS.length
        const nextId = DEPARTMENTS[nextIdx].id
        scrollTabIntoView(nextId)
        return nextId
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [scrollTabIntoView])

  return (
    <section
      ref={sectionRef}
      id="departments"
      className="py-8 sm:py-6 md:py-7 lg:py-14 bg-white"
      onMouseEnter={() => { isPausedRef.current = true }}
      onMouseLeave={() => { isPausedRef.current = false }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-left max-w-2xl">
          <h2 className="mt-2 sm:mt-3 font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-[30px] lg:text-4xl leading-tight">
            Specialities &amp; Departments
          </h2>
          <p className="mt-3 sm:mt-4 leading-relaxed text-slate-600 text-sm sm:text-base">
            Comprehensive clinical departments staffed by dedicated specialists, offering outpatient consultations, diagnostic support and inpatient care.
          </p>
        </div>

        {/* Department Tabs with Left/Right Arrows for Horizontal Scrolling */}
        <div className="mt-8 sm:mt-10 relative flex items-center">
          <button
            type="button"
            onClick={() => scrollTabs('left')}
            aria-label="Scroll departments left"
            className="hidden sm:flex absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#E2ECE9] shadow-md text-slate-700 hover:text-[#00A88F] hover:border-[#00A88F] items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
          </button>

          <div
            ref={tabsContainerRef}
            id="dept-tabs"
            className="tab-scroll no-scrollbar flex gap-2.5 overflow-x-auto py-1 scroll-px-4 w-full"
          >
            {DEPARTMENTS.map((d) => {
              const isActive = d.id === activeId
              const Icon = d.icon
              return (
                <button
                  key={d.id}
                  type="button"
                  data-dept={d.id}
                  onClick={() => handleSelectDept(d.id)}
                  className={`dept-tab shrink-0 w-[130px] sm:w-[145px] md:w-[155px] lg:w-[165px] min-h-[115px] sm:min-h-[125px] p-3 sm:p-4 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center text-center gap-2.5 group cursor-pointer ${isActive
                      ? 'bg-[#00A88F] text-white shadow-lg border-2 border-[#00A88F]'
                      : 'bg-white border border-[#E2ECE9] text-slate-800 hover:border-[#00A88F] hover:text-[#00A88F] shadow-xs hover:shadow-md'
                    }`}
                >
                  <Icon
                    className={`w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#00A88F]'
                      }`}
                    strokeWidth={1.8}
                  />
                  <span className="text-xs sm:text-[13px] font-display font-semibold leading-tight line-clamp-2 text-center">
                    {d.name}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollTabs('right')}
            aria-label="Scroll departments right"
            className="hidden sm:flex absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-[#E2ECE9] shadow-md text-slate-700 hover:text-[#00A88F] hover:border-[#00A88F] items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Sliding Department Panels Showcase */}
        <div id="dept-panel" className="mt-8 overflow-hidden w-full rounded-2xl sm:rounded-3xl border border-[#E2ECE9]">
          <div
            id="dept-slides-container"
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.id}
                className="w-full shrink-0 grid md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.25fr_0.75fr] gap-6 lg:gap-10 items-center bg-[#F6FBFA] px-5 sm:px-7 md:px-8 lg:px-10 py-7 sm:py-8 md:py-9 lg:py-10"
              >
                {/* Image Column (First on mobile, right on desktop) */}
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-sm border border-[#E2ECE9] bg-slate-50 w-full h-[230px] sm:h-[260px] md:h-[285px] lg:h-[310px] max-w-[440px] md:ml-auto">
                  <img
                    src={dept.image}
                    alt={`${dept.name} at Clinica Cure Hospital`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* Content Column (Below image on mobile, left on desktop) */}
                <div className="order-2 md:order-1 flex flex-col justify-center">
                  <p className="text-[#00A88F] font-display font-semibold sm:font-bold text-xs tracking-[0.14em] uppercase">
                    Department of
                  </p>
                  <h3 className="mt-1.5 sm:mt-2 font-display font-bold sm:font-extrabold text-slate-900 text-xl sm:text-2xl lg:text-[28px] leading-tight">
                    {dept.name}
                  </h3>
                  <span className="block w-10 h-[3px] bg-[#00A88F] rounded mt-2" />
                  <p className="mt-2.5 sm:mt-3.5 leading-relaxed text-slate-600 text-[14px] sm:text-sm md:text-[13.5px] lg:text-base">
                    {dept.desc}
                  </p>
                  <div className="mt-3.5 sm:mt-4 lg:mt-6 grid sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-2 sm:gap-y-2.5 lg:gap-y-3">
                    {dept.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-2 text-[14px] sm:text-sm">
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#00A88F] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={3} />
                        </span>
                        <span className="text-slate-800 font-medium leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex flex-row items-center gap-2.5 sm:gap-3 lg:gap-4 flex-nowrap">
                    <Link
                      href={`/departments/${dept.id}`}
                      className="px-4 sm:px-5 lg:px-6 h-10 sm:h-11 lg:h-12 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#00A88F] hover:bg-[#008f7a] text-white font-display font-semibold text-xs sm:text-sm shadow-xs whitespace-nowrap transition-colors"
                    >
                      <span>Explore More</span>
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </Link>
                    <Link
                      href="/book-appointment"
                      className="px-4 sm:px-5 lg:px-6 h-10 sm:h-11 lg:h-12 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-[#E2ECE9] font-display font-semibold text-xs sm:text-sm whitespace-nowrap transition-colors"
                    >
                      <span>Find a Doctor</span>
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
