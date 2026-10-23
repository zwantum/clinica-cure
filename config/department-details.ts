import {
  Thermometer,
  Activity,
  Heart,
  Droplets,
  Wind,
  Layers,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Bone,
  Brain,
  Baby,
  Eye,
  Scissors,
  Smile,
  Zap,
  HeartPulse,
  Syringe,
  type LucideIcon,
} from 'lucide-react'

export interface DepartmentData {
  subtitle: string
  heroDesc: string
  heroImage: string
  aboutDesc1: string
  aboutDesc2: string
  aboutImage: string
  aboutTags: string[]
  conditions: Array<{
    name: string
    icon: LucideIcon
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  relatedSlugs: string[]
}

export const DEPARTMENT_DATA: Record<string, DepartmentData> = {
  'general-medicine': {
    subtitle: 'Comprehensive Care for Everyday Health Concerns',
    heroDesc:
      'Our General Medicine department provides expert diagnosis, treatment, and long-term management for a wide range of health conditions. We focus on preventive care, early detection, and personalised treatment to keep you and your family healthy at every stage of life.',
    heroImage:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1:
      'The General Medicine department at Clinica Cure Hospital is dedicated to providing comprehensive, evidence-based care for adults with a wide range of medical conditions. Our experienced physicians focus on accurate diagnosis, effective treatment, and preventive healthcare to help you maintain a healthier, better quality life.',
    aboutDesc2:
      'We treat acute and chronic illnesses, manage lifestyle-related conditions, and coordinate care with other specialties when needed. Our goal is to provide patient-centered care with compassion, clear communication, and a focus on long-term well-being.',
    aboutImage:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      'Comprehensive Adult Care',
      'Preventive Health Focus',
      'Coordinated Multi-Speciality Care',
      'Patient-Centric Approach',
    ],
    conditions: [
      { name: 'Fever & Infections', icon: Thermometer },
      { name: 'Diabetes Management', icon: Activity },
      { name: 'Hypertension', icon: Heart },
      { name: 'Thyroid Disorders', icon: Zap },
      { name: 'Respiratory Illnesses', icon: Wind },
      { name: 'Gastrointestinal Issues', icon: Layers },
      { name: 'Liver Disorders', icon: Droplets },
      { name: 'Lifestyle & Metabolic Conditions', icon: ShieldCheck },
    ],
    faqs: [
      {
        question: 'What conditions are treated in the General Medicine department?',
        answer:
          'Our general physicians manage acute infections, viral illnesses, persistent fevers, chronic lifestyle disorders like diabetes, high blood pressure, thyroid imbalance, respiratory allergies, and unexplained systemic symptoms.',
      },
      {
        question: 'Do I need a referral to consult a General Medicine doctor?',
        answer:
          'No referral is needed. You can schedule an outpatient consultation directly online or visit our hospital reception in Bariatu, Ranchi during OPD hours (9 AM – 8 PM).',
      },
      {
        question: 'Can lifestyle diseases like diabetes or hypertension be managed here?',
        answer:
          'Yes. We offer long-term holistic disease management protocols, including routine HbA1c monitoring, cardiovascular risk screening, medication adjustment, and dietary guidance.',
      },
      {
        question: 'How often should I go for a general health check-up?',
        answer:
          'Healthy adults under 40 are recommended to undergo a routine wellness screening every 1–2 years. Individuals over 40 or those with family histories of diabetes or heart disease should undergo annual comprehensive check-ups.',
      },
    ],
    relatedSlugs: ['cardiology', 'neurology', 'pulmonology', 'gastroenterology'],
  },
  'orthopedics-joint-replacement': {
    subtitle: 'Advanced Joint Care, Sports Medicine & Fracture Recovery',
    heroDesc:
      'Specialised orthopaedic care offering total knee and hip replacement, arthroscopic sports injury repair, complex fracture stabilization, and dedicated postoperative physiotherapy.',
    heroImage:
      'https://images.unsplash.com/photo-1579156412503-f22426cc6386?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1:
      'Our Department of Orthopaedics & Joint Replacement brings together senior joint surgeons, arthroscopy specialists, and rehabilitation therapists to restore mobility and eliminate chronic joint pain.',
    aboutDesc2:
      'Utilizing precision instrumentation and minimally invasive surgical towers, our surgical team prioritizes rapid mobilization, minimal soft tissue disruption, and long-term joint longevity.',
    aboutImage:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      'Total Knee & Hip Replacements',
      'Minimally Invasive Arthroscopy',
      '24/7 Trauma & Fracture Care',
      'Dedicated Physiotherapy Unit',
    ],
    conditions: [
      { name: 'Knee Osteoarthritis', icon: Bone },
      { name: 'Hip Joint Degeneration', icon: Bone },
      { name: 'ACL & Meniscus Tears', icon: Activity },
      { name: 'Complex Bone Fractures', icon: Zap },
      { name: 'Spine & Sciatica Pain', icon: Layers },
      { name: 'Shoulder Dislocation & Rotator Cuff', icon: ShieldCheck },
      { name: 'Sports Ligament Injuries', icon: Activity },
      { name: 'Geriatric Osteoporosis', icon: HeartPulse },
    ],
    faqs: [
      {
        question: 'What is the recovery time after a total knee replacement?',
        answer:
          'Most patients begin walking with support within 24 hours of surgery. Independent walking usually resumes within 3–4 weeks with guided physiotherapy.',
      },
      {
        question: 'Are arthroscopic sports surgeries available?',
        answer:
          'Yes, our sports arthroscopy surgeons routinely perform keyhole ACL, PCL, and meniscus repairs with smaller incisions and faster return to sports.',
      },
      {
        question: 'Does Clinica Cure handle emergency fractures and trauma?',
        answer:
          'Yes, our 24x7 trauma team and modular OTs are always ready for emergency polytrauma and fracture fixations in Bariatu, Ranchi.',
      },
      {
        question: 'Is postoperative physiotherapy available on campus?',
        answer:
          'Yes, our in-house physiotherapy department works directly with your operating surgeon to ensure customized daily recovery protocols.',
      },
    ],
    relatedSlugs: ['general-medicine', 'neurosurgery', 'anaesthesia-critical-care', 'radiology'],
  },
  'neurosurgery': {
    subtitle: 'Precision Brain & Spine Surgery with 24x7 Neuro-ICU Support',
    heroDesc:
      'Advanced microsurgical and endoscopic interventions for brain tumours, spinal trauma, acute stroke decompression, hydrocephalus, and complex nerve disorders.',
    heroImage:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1:
      'The Department of Neurosurgery at Clinica Cure Hospital delivers tertiary surgical care for complex central and peripheral nervous system disorders under experienced neurosurgeons.',
    aboutDesc2:
      'Supported by high-resolution neuro-imaging, modular laminar airflow theatres, and an intensive Neuro-ICU, we ensure critical brain and spine patients receive swift, life-saving interventions.',
    aboutImage:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      'Microscopic Brain Surgery',
      'Minimally Invasive Spine Fixation',
      '24/7 Neurotrauma Emergency',
      'Advanced Neuro-ICU Beds',
    ],
    conditions: [
      { name: 'Brain & Skull Base Tumours', icon: Brain },
      { name: 'Head Injuries & Brain Haemorrhage', icon: Zap },
      { name: 'Cervical & Lumbar Disc Herniation', icon: Layers },
      { name: 'Spinal Cord Tumours', icon: Bone },
      { name: 'Hydrocephalus & Shunt Disorders', icon: Droplets },
      { name: 'Aneurysms & Vascular Malformations', icon: Heart },
      { name: 'Trigeminal Neuralgia', icon: Activity },
      { name: 'Pediatric Neurosurgical Conditions', icon: Baby },
    ],
    faqs: [
      {
        question: 'When is spine surgery necessary for back or neck pain?',
        answer:
          'Surgery is typically considered when conservative therapies fail, or when there is progressive nerve compression, leg numbness, or severe motor weakness.',
      },
      {
        question: 'Does the hospital provide immediate care for head trauma?',
        answer:
          'Yes, our emergency team and neurotrauma surgeons are on standby 24 hours a day for immediate surgical decompression and intensive ICU monitoring.',
      },
      {
        question: 'What is minimally invasive spine surgery (MISS)?',
        answer:
          'MISS utilizes tubular retractors and endoscopes to relieve nerve compression through small keyhole incisions, resulting in less tissue damage and faster recovery.',
      },
      {
        question: 'How do I book an appointment with a neurosurgeon?',
        answer:
          'Appointments can be booked online via our portal or by calling our hospital appointment desk at +91 92633 97076.',
      },
    ],
    relatedSlugs: ['neurology', 'orthopedics-joint-replacement', 'radiology', 'anaesthesia-critical-care'],
  },
  'cardiology': {
    subtitle: 'Advanced Cardiac Care, Interventions & Heart Health',
    heroDesc:
      'From 24x7 acute coronary care and angiography to heart failure management, echocardiography, and preventive risk assessment, our cardiology faculty is dedicated to heart wellness.',
    heroImage:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1:
      'The Department of Cardiology at Clinica Cure Hospital offers comprehensive cardiovascular care for prevention, diagnosis, and medical stabilization of heart diseases.',
    aboutDesc2:
      'We combine non-invasive diagnostics like 2D Echocardiography, TMT, and Holter monitoring with acute intensive coronary unit protocols to provide complete cardiac support.',
    aboutImage:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      '24/7 Acute Cardiac Emergency',
      '2D Echo, ECG & TMT Diagnostics',
      'Heart Failure Management',
      'Preventive Cardiac Checkups',
    ],
    conditions: [
      { name: 'Coronary Artery Disease', icon: Heart },
      { name: 'Hypertension & Heart Failure', icon: Activity },
      { name: 'Arrhythmias & Palpitations', icon: Zap },
      { name: 'Chest Pain & Angina Evaluation', icon: HeartPulse },
      { name: 'Valvular Heart Disease', icon: Layers },
      { name: 'High Cholesterol & Dyslipidemia', icon: Droplets },
      { name: 'Cardiomyopathy', icon: ShieldCheck },
      { name: 'Preventive Cardiac Health', icon: Stethoscope },
    ],
    faqs: [
      {
        question: 'What should I do if someone experiences acute chest pain?',
        answer:
          'Immediately rush the patient to our 24x7 Emergency Trauma Unit in Bariatu, Ranchi or call our ambulance desk at +91 92633 97076 for swift resuscitation.',
      },
      {
        question: 'What non-invasive cardiac tests are available on campus?',
        answer:
          'We perform digital 12-lead ECG, 2D Echocardiography with colour Doppler, Treadmill Stress Testing (TMT), and 24-hour ambulatory Holter monitoring.',
      },
      {
        question: 'Who should undergo preventive cardiac screening?',
        answer:
          'Anyone above 35 with risk factors like diabetes, hypertension, smoking, obesity, high stress, or a family history of premature heart disease should get screened annually.',
      },
      {
        question: 'Can hypertension be managed without lifelong heavy medications?',
        answer:
          'Early-stage hypertension can often be substantially improved through guided dietary changes, weight control, and exercise alongside targeted medical management.',
      },
    ],
    relatedSlugs: ['general-medicine', 'anaesthesia-critical-care', 'pulmonology', 'radiology'],
  },
  'general-laparoscopic-surgery': {
    subtitle: 'Minimally Invasive Keyhole & Advanced Surgical Care',
    heroDesc:
      'Expert surgical procedures with minimal pain, tiny incisions, and fast recovery for gallbladder stones, hernias, appendicitis, piles, fissures, and abdominal emergencies.',
    heroImage:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1:
      'Our Department of General & Laparoscopic Surgery combines modern high-definition endoscopy towers with experienced surgical consultants to offer safe, state-of-the-art procedures.',
    aboutDesc2:
      'Keyhole laparoscopy ensures smaller scars, lower infection rates, minimal post-operative discomfort, and same-day or next-day hospital discharge for routine surgical conditions.',
    aboutImage:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      'Advanced 4K Laparoscopy',
      'Laser Proctology (Piles/Fistula)',
      'Modular Sterile Operation Theatres',
      'Rapid Post-Op Recovery',
    ],
    conditions: [
      { name: 'Gallbladder Stones (Cholecystectomy)', icon: Scissors },
      { name: 'Inguinal & Ventral Hernia', icon: Layers },
      { name: 'Acute Appendicitis', icon: Zap },
      { name: 'Piles, Fissure & Fistula', icon: Activity },
      { name: 'Thyroid & Breast Lumps', icon: ShieldCheck },
      { name: 'Hydrocele & Varicocele', icon: Droplets },
      { name: 'Abdominal Trauma & Emergencies', icon: HeartPulse },
      { name: 'Soft Tissue Swellings & Cysts', icon: Bone },
    ],
    faqs: [
      {
        question: 'What are the benefits of laparoscopic surgery over open surgery?',
        answer:
          'Laparoscopic surgery uses small 5–10mm keyhole incisions, resulting in significantly less post-surgical pain, minimal scarring, lower infection risk, and a much faster return to work.',
      },
      {
        question: 'How long do I need to stay in the hospital after laparoscopic gallbladder surgery?',
        answer:
          'Most patients are discharged within 24 to 48 hours following uncomplicated laparoscopic cholecystectomy.',
      },
      {
        question: 'Is laser treatment available for piles and fissures?',
        answer:
          'Yes, we offer advanced minimally invasive laser procedures for piles, fissures, and pilonidal sinuses with negligible blood loss and rapid healing.',
      },
      {
        question: 'Does the hospital accept cashless insurance for surgeries?',
        answer:
          'Yes, Clinica Cure Hospital supports major TPAs and health insurance providers with cashless desk assistance.',
      },
    ],
    relatedSlugs: ['gastroenterology', 'urology', 'anaesthesia-critical-care', 'obstetrics-gynecology'],
  },
  'obstetrics-gynecology': {
    subtitle: 'Comprehensive Maternity, Gynaecological & Women’s Health',
    heroDesc:
      'Compassionate women’s health care from routine prenatal support and normal/cesarean deliveries to high-risk pregnancies, infertility management, and laparoscopic gynaec surgeries.',
    heroImage:
      'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1:
      'The Department of Obstetrics & Gynaecology at Clinica Cure Hospital provides safe, respectful, and family-centered care for women throughout all stages of life.',
    aboutDesc2:
      'Backed by fully equipped delivery suites, neonatal care units, and experienced gynaecologists, we ensure mothers and newborns receive the highest standard of warmth and medical safety.',
    aboutImage:
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      'Normal & High-Risk Deliveries',
      'Advanced Gynaec Laparoscopy',
      'Infertility & PCOS Care',
      'Comprehensive Antenatal Programs',
    ],
    conditions: [
      { name: 'High-Risk Pregnancies', icon: Heart },
      { name: 'Normal & Caesarean Delivery', icon: Baby },
      { name: 'PCOS & Hormonal Imbalances', icon: Activity },
      { name: 'Uterine Fibroids & Ovarian Cysts', icon: Layers },
      { name: 'Infertility Workup & Counselling', icon: ShieldCheck },
      { name: 'Irregular Bleeding & Menopause', icon: Droplets },
      { name: 'Endometriosis Management', icon: Zap },
      { name: 'Cervical Cancer Screening (Pap Smear)', icon: Microscope },
    ],
    faqs: [
      {
        question: 'Does the hospital handle high-risk pregnancies?',
        answer:
          'Yes. Our senior obstetricians, backed by round-the-clock ICU, blood bank coordination, and neonatologists, manage gestational diabetes, pre-eclampsia, and twin pregnancies.',
      },
      {
        question: 'What antenatal care packages are available?',
        answer:
          'We offer comprehensive mother-and-baby packages including periodic clinical check-ups, anomaly ultrasounds, nutritional counsel, and delivery planning.',
      },
      {
        question: 'Are laparoscopic surgeries available for ovarian cysts and fibroids?',
        answer:
          'Yes, we specialize in laparoscopic cystectomy, myomectomy, and hysterectomy with minimal incisions and speedy postoperative discharge.',
      },
      {
        question: 'How do I consult a female gynaecologist?',
        answer:
          'You can select our verified female gynaecologists and book an appointment directly through our online booking system.',
      },
    ],
    relatedSlugs: ['pediatric-neonatal', 'general-laparoscopic-surgery', 'general-medicine', 'radiology'],
  },
}

// Fallback generator for departments not explicitly defined in the detailed map
export function getDepartmentData(slug: string, name: string): DepartmentData {
  if (DEPARTMENT_DATA[slug]) {
    return DEPARTMENT_DATA[slug]
  }

  return {
    subtitle: `Specialised Clinical Care & Advanced Treatment in ${name}`,
    heroDesc: `Our Department of ${name} at Clinica Cure Hospital provides expert diagnostics, evidence-based medical treatment, and patient-first care delivered by experienced consultants in Bariatu, Ranchi.`,
    heroImage:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    aboutDesc1: `The Department of ${name} at Clinica Cure Hospital is dedicated to providing high-quality, comprehensive healthcare. Our experienced clinical faculty focuses on precise diagnosis, modern treatments, and supportive patient recovery.`,
    aboutDesc2: `Backed by 24x7 emergency medical readiness, high-tech diagnostics, modular operating suites, and compassionate nursing care, we ensure patients receive the highest standard of healthcare in Jharkhand.`,
    aboutImage:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    aboutTags: [
      'Specialised Consultant Care',
      'Advanced In-House Diagnostics',
      '24/7 Hospital Emergency Cover',
      'Ethical & Transparent Treatment',
    ],
    conditions: [
      { name: 'Acute Clinical Consultations', icon: Stethoscope },
      { name: 'Chronic Disease Monitoring', icon: Activity },
      { name: 'Specialist Medical Reviews', icon: ShieldCheck },
      { name: 'Diagnostic Screenings', icon: Microscope },
      { name: 'Preventive Health Care', icon: Heart },
      { name: 'Therapeutic Interventions', icon: Syringe },
      { name: 'Inpatient Hospital Care', icon: Layers },
      { name: 'Post-Care Rehabilitation', icon: HeartPulse },
    ],
    faqs: [
      {
        question: `What clinical conditions are treated in the ${name} department?`,
        answer: `Our consultants manage a comprehensive range of acute and chronic conditions related to ${name}, utilizing evidence-based treatment protocols.`,
      },
      {
        question: `Do I need a prior appointment to consult a specialist?`,
        answer: `While walk-in patients are accommodated during OPD hours (9 AM – 8 PM), booking online guarantees your confirmed time slot with minimal waiting.`,
      },
      {
        question: `Are diagnostic facilities available under the same roof?`,
        answer: `Yes, Clinica Cure Hospital features complete in-house digital radiology, ultrasound, and pathology laboratory testing with rapid report turnaround.`,
      },
      {
        question: `How can I contact the department helpdesk?`,
        answer: `You can reach our main helpline at +91 92633 97076 or visit the hospital reception in Bariatu, Ranchi.`,
      },
    ],
    relatedSlugs: ['general-medicine', 'orthopedics-joint-replacement', 'cardiology', 'radiology'],
  }
}

export const RELATED_DEPT_INFO: Record<
  string,
  { title: string; subtitle: string; image: string }
> = {
  cardiology: {
    title: 'Cardiology',
    subtitle: 'Heart care and cardiovascular health',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=160&q=80',
  },
  neurology: {
    title: 'Neurology & Neurosurgery',
    subtitle: 'Brain, spine and nervous system care',
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=160&q=80',
  },
  neurosurgery: {
    title: 'Neurology & Neurosurgery',
    subtitle: 'Brain, spine and nervous system care',
    image:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=160&q=80',
  },
  pulmonology: {
    title: 'Pulmonology',
    subtitle: 'Lung and respiratory health',
    image:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=160&q=80',
  },
  gastroenterology: {
    title: 'Endocrinology & Gastro',
    subtitle: 'Hormonal and metabolic disorders',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=160&q=80',
  },
  'orthopedics-joint-replacement': {
    title: 'Orthopedics & Joint',
    subtitle: 'Joint replacement & sports medicine',
    image:
      'https://images.unsplash.com/photo-1579156412503-f22426cc6386?auto=format&fit=crop&w=160&q=80',
  },
  'general-medicine': {
    title: 'General Medicine',
    subtitle: 'Comprehensive everyday health care',
    image:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=160&q=80',
  },
  'general-laparoscopic-surgery': {
    title: 'General & Laparoscopic Surgery',
    subtitle: 'Minimally invasive keyhole procedures',
    image:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=160&q=80',
  },
  'obstetrics-gynecology': {
    title: 'Obstetrics & Gynecology',
    subtitle: 'Maternity and comprehensive women health',
    image:
      'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=160&q=80',
  },
  radiology: {
    title: 'Radiology & Imaging',
    subtitle: 'Advanced 3T MRI, CT & ultrasound scans',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=160&q=80',
  },
  'pediatric-neonatal': {
    title: 'Pediatric & Neonatal',
    subtitle: 'Compassionate child health & NICU',
    image:
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=160&q=80',
  },
  urology: {
    title: 'Urology',
    subtitle: 'Kidney stones & urinary tract care',
    image:
      'https://images.unsplash.com/photo-1579156412503-f22426cc6386?auto=format&fit=crop&w=160&q=80',
  },
}

export function getRelatedDepartmentInfo(slug: string, fallbackName: string) {
  if (RELATED_DEPT_INFO[slug]) {
    return RELATED_DEPT_INFO[slug]
  }
  return {
    title: fallbackName,
    subtitle: 'Specialised medical & surgical care',
    image:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=160&q=80',
  }
}

