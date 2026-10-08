-- ==============================================================================
-- CLINICA CURE HOSPITAL - SUPABASE POSTGRESQL SCHEMA & SEED DATA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  image_url TEXT,
  icon TEXT,
  services TEXT[] DEFAULT '{}',
  conditions TEXT[] DEFAULT '{}',
  facilities TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  designation TEXT NOT NULL,
  short_title TEXT,
  qualifications TEXT[] DEFAULT '{}',
  bio TEXT,
  profile_image TEXT,
  consultation_fee NUMERIC(10, 2) DEFAULT 0.00,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DOCTOR_DEPARTMENTS (Junction Table)
CREATE TABLE IF NOT EXISTS doctor_departments (
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  PRIMARY KEY (doctor_id, department_id)
);

-- 4. DOCTOR AVAILABILITY
CREATE TABLE IF NOT EXISTS doctor_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INTEGER DEFAULT 15,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  gender TEXT,
  age INTEGER,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PATIENT STORIES TABLE
CREATE TABLE IF NOT EXISTS patient_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_name TEXT NOT NULL,
  condition TEXT NOT NULL,
  outcome TEXT NOT NULL,
  department TEXT,
  description TEXT,
  video_url TEXT,
  thumbnail TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. GOOGLE REVIEWS TABLE
CREATE TABLE IF NOT EXISTS google_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_name TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  time_ago TEXT,
  avatar_initial TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. HOSPITAL UPDATES / NOTICES TABLE
CREATE TABLE IF NOT EXISTS hospital_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT DEFAULT 'Hospital News',
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ENABLE ROW LEVEL SECURITY
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_updates ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS POLICIES
CREATE POLICY "Public can view active departments" ON departments FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active doctors" ON doctors FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view doctor_departments" ON doctor_departments FOR SELECT USING (TRUE);
CREATE POLICY "Public can view active availability" ON doctor_availability FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active stories" ON patient_stories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active reviews" ON google_reviews FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view published updates" ON hospital_updates FOR SELECT USING (is_published = TRUE);

-- PUBLIC INSERT POLICIES (Booking Appointments & Inquiries)
CREATE POLICY "Public can create appointments" ON appointments FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public can submit contact inquiries" ON contact_submissions FOR INSERT WITH CHECK (TRUE);

-- ==============================================================================
-- SEED DATA
-- ==============================================================================

-- Seed Departments
INSERT INTO departments (name, slug, short_description, description, image_url, icon, services, conditions, facilities)
VALUES
(
  'General Medicine',
  'general-medicine',
  'Comprehensive care for acute, chronic, and lifestyle medical conditions.',
  'Our Department of General Medicine provides comprehensive care for a wide range of acute and chronic medical conditions. From infections and fever to lifestyle diseases like diabetes and hypertension, our physicians ensure accurate diagnosis and effective treatment.',
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  'stethoscope',
  ARRAY['Diagnosis of Acute & Chronic Illnesses', 'Infection & Fever Management', 'Lifestyle Disease Management', 'Diabetes Care', 'Hypertension Care', 'Preventive Health Check-ups'],
  ARRAY['Diabetes Mellitus', 'Hypertension', 'Viral Fevers & Dengue', 'Respiratory Infections', 'Metabolic Disorders'],
  ARRAY['Day Care Unit', 'Executive OPD Consultation Suites', 'In-house Diagnostic Coordination']
),
(
  'General & Laparoscopic Surgery',
  'general-laparoscopic-surgery',
  'Minimally invasive keyhole and standard surgical operations with rapid recovery.',
  'Our surgical team performs a wide range of general and minimally invasive laparoscopic procedures, prioritising faster recovery, smaller incisions and reduced post-operative discomfort for every patient.',
  'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
  'first-aid-kit',
  ARRAY['Laparoscopic Surgery', 'Hernia Repair', 'Gallbladder Surgery', 'Appendix Surgery', 'Piles & Fissure Treatment', 'Laser Proctology'],
  ARRAY['Gallstones', 'Appendicitis', 'Inguinal & Ventral Hernia', 'Hemorrhoids & Fistula', 'Abdominal Trauma'],
  ARRAY['Modular Operating Theatres', 'HD Laparoscopy Towers', 'Surgical Recovery Ward']
),
(
  'Obstetrics & Gynaecology',
  'obstetrics-gynaecology',
  'Comprehensive woman & child healthcare from antenatal care to delivery and infertility.',
  'From routine gynaecological care to high-risk pregnancy management, our OBGYN team supports women through every stage of life with compassion, privacy and clinical expertise.',
  'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80',
  'gender-female',
  ARRAY['High-Risk Pregnancy Care', 'Normal & Caesarean Delivery', 'Infertility Evaluation', 'Menstrual Disorder Treatment', 'Gynaec Laparoscopy', 'Antenatal & Postnatal Care'],
  ARRAY['PCOS/PCOD', 'Infertility', 'Fibroids & Ovarian Cysts', 'Complicated Pregnancy', 'Pelvic Organ Prolapse'],
  ARRAY['Labour Delivery Rooms (LDR)', 'Neonatal Resuscitation Unit', 'Ultrasound & Foetal Monitoring']
),
(
  'Neurology & Neurosurgery',
  'neurology-neurosurgery',
  'Advanced medical and surgical treatment for brain, spine, and nervous system disorders.',
  'Our neurology and neurosurgery specialists diagnose and manage disorders of the brain, spine and nervous system using advanced diagnostics and evidence-based treatment protocols.',
  'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
  'brain',
  ARRAY['Brain & Spine Surgery', 'Head & Spine Trauma', 'Neurotrauma ICU', 'Stroke Management', 'Epilepsy & Migraine Clinic', 'Neuro-rehabilitation'],
  ARRAY['Brain Haemorrhage', 'Spinal Cord Injuries', 'Disc Herniation', 'Stroke', 'Brain Tumours', 'Sciatica'],
  ARRAY['Neuro-ICU with Ventilators', 'Craniotomy Equipment', 'Micro-neurosurgical Instrumentation']
),
(
  'Orthopaedics',
  'orthopaedics',
  'Specialised diagnosis and surgical intervention for bones, joints, and spine.',
  'Our orthopaedic specialists diagnose and treat conditions of the bones, joints, muscles and spine, helping patients regain mobility and return to pain-free, active lives.',
  'https://images.unsplash.com/photo-1579156412503-f22426cc6386?auto=format&fit=crop&w=800&q=80',
  'bone',
  ARRAY['Joint Replacement Surgery', 'Arthroscopy', 'Sports Injury Treatment', 'Spine & Back Pain Management', 'Fracture & Trauma Care', 'Physiotherapy'],
  ARRAY['Knee Osteoarthritis', 'Hip Fractures', 'ACL & Meniscus Tears', 'Slipped Disc', 'Complex Fractures'],
  ARRAY['Orthopaedic Laminar Flow OTs', 'Digital C-Arm Fluoroscopy', 'Full Rehabilitation Gym']
),
(
  'Cardiology',
  'cardiology',
  'Heart screening, emergency cardiac stabilization, and preventive cardiovascular care.',
  'Our cardiology department offers comprehensive heart care — from preventive screening to advanced interventional procedures — supported by an experienced critical care team.',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'heart',
  ARRAY['Cardiac Evaluation', 'ECG & Echo Diagnostics', 'Hypertension & Lipid Clinics', 'Heart Failure Management', 'Post-Angioplasty Care'],
  ARRAY['Coronary Artery Disease', 'Heart Attacks', 'Arrhythmias', 'Hypertensive Heart Disease'],
  ARRAY['Cardiac Monitoring Stations', 'Defibrillators & Emergency Crash Carts', 'Echo Doppler Ultrasound']
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Doctors
INSERT INTO doctors (name, slug, designation, short_title, qualifications, profile_image, is_active)
VALUES
(
  'Dr. Syed Altamash',
  'dr-syed-altamash',
  'General & Laparoscopic Surgeon',
  'Gold Medalist',
  ARRAY['MBBS', 'MS', 'FIAGES', 'FMAS'],
  'https://clinicacure.com/wp-content/uploads/2023/05/Dr.-Syed-Altamash-at-clinica-cure-profile-image.webp',
  TRUE
),
(
  'Dr. Aftab Alam',
  'dr-aftab-alam',
  'General Physician & Intensivist',
  'CEO & Director | Critical Care Specialist',
  ARRAY['MBBS', 'Post-Graduation in Anaesthesia & Critical Care'],
  'https://clinicacure.com/wp-content/uploads/2024/01/Dr-Aftab-Alam.jpeg',
  TRUE
),
(
  'Dr. Vivek Goswami',
  'dr-vivek-goswami',
  'Plastic & Reconstructive Surgeon',
  'Consultant & Gold Medalist',
  ARRAY['MBBS', 'MS', 'DrNB (Plastic Surgery)', 'MNAMS', 'DNSS'],
  'https://clinicacure.com/wp-content/uploads/2023/12/Dr-Vivek-Goswami.jpg',
  TRUE
),
(
  'Dr. Tarique Jamil Hasan',
  'dr-tarique-jamil-hasan',
  'Brain & Spine Specialist / Neurosurgeon',
  '24x7 Available | Trauma Specialist',
  ARRAY['MBBS', 'MS', 'MCh (Neurosurgery)'],
  'https://clinicacure.com/wp-content/uploads/2024/03/Dr-Tariq.jpeg',
  TRUE
),
(
  'Dr. Soniya Bansal',
  'dr-soniya-bansal',
  'Consultant Gynaecologist & Infertility Specialist',
  'Infertility & High-Risk Pregnancy Specialist',
  ARRAY['MBBS', 'MD', 'DGO', 'FMAS'],
  'https://clinicacure.com/wp-content/uploads/2023/05/doctor-at-clinica-cure-placeholder-female.webp',
  TRUE
),
(
  'Dr. A.K. Agarwal',
  'dr-a-k-agarwal',
  'Senior Consultant Physician',
  'Senior Physician | Diabetes & Heart Specialist',
  ARRAY['MBBS', 'MD (Medicine)'],
  'https://clinicacure.com/wp-content/uploads/2023/05/doctor-at-clinica-cure-placeholder-male.webp',
  TRUE
)
ON CONFLICT (slug) DO NOTHING;
