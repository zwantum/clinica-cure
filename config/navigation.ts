export const navigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Doctors', href: '/doctors' },
    {
      label: 'Departments',
      href: '/departments',
      hasMegaMenu: true,
    },
    { label: 'Patient Stories', href: '/patient-stories' },
    { label: 'Core Partners', href: '/core-partners' },
    { label: 'Blood Bank & Donation', href: '/blood-bank' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export interface NavDepartment {
  name: string
  slug: string
  icon: string
  aliases?: string[]
}

// All 20 departments from Clinica Cure Hospital official roster
export const departments: NavDepartment[] = [
  { name: 'General Medicine', slug: 'general-medicine', icon: 'stethoscope', aliases: ['internal-medicine'] },
  { name: 'Orthopedics & Joint Replacement', slug: 'orthopedics-joint-replacement', icon: 'bone', aliases: ['orthopaedics', 'orthopedics'] },
  { name: 'Neurosurgery', slug: 'neurosurgery', icon: 'brain', aliases: ['neurology-neurosurgery'] },
  { name: 'Cardiology', slug: 'cardiology', icon: 'heart' },
  { name: 'General & Laparoscopic Surgery', slug: 'general-laparoscopic-surgery', icon: 'first-aid-kit', aliases: ['general-surgery'] },
  { name: 'Obstetrics & Gynecology', slug: 'obstetrics-gynecology', icon: 'gender-female', aliases: ['obstetrics-gynaecology', 'obgyn'] },
  { name: 'Anaesthesia & Critical Care', slug: 'anaesthesia-critical-care', icon: 'syringe', aliases: ['critical-care', 'anaesthesia'] },
  { name: 'Neurology', slug: 'neurology', icon: 'brain', aliases: ['neuro-physician'] },
  { name: 'Urology', slug: 'urology', icon: 'drop' },
  { name: 'Pediatric & Neonatal', slug: 'pediatric-neonatal', icon: 'baby', aliases: ['paediatrics-child-care', 'pediatrics-neonatology', 'paediatrics'] },
  { name: 'Ophthalmology', slug: 'ophthalmology', icon: 'eye' },
  { name: 'Pulmonology', slug: 'pulmonology', icon: 'lungs', aliases: ['chest-respiratory'] },
  { name: 'Radiology', slug: 'radiology', icon: 'scan', aliases: ['radiology-imaging'] },
  { name: 'Gastroenterology', slug: 'gastroenterology', icon: 'activity' },
  { name: 'Nephrology', slug: 'nephrology', icon: 'droplets' },
  { name: 'Reconstructive Plastic Surgery', slug: 'reconstructive-plastic-surgery', icon: 'scissors', aliases: ['plastic-surgery'] },
  { name: 'Oral & Maxillofacial Surgery', slug: 'oral-maxillofacial-surgery', icon: 'smile', aliases: ['dental-surgery', 'dentistry'] },
  { name: 'Dermatology', slug: 'dermatology', icon: 'layers' },
  { name: 'Microbiology & Pathology', slug: 'microbiology-pathology', icon: 'microscope', aliases: ['pathology'] },
  { name: 'Preventive Medicine', slug: 'preventive-medicine', icon: 'shield-check' },
]

export type NavItem = (typeof navigation.main)[number]
export type Department = NavDepartment
