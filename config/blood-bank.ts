export interface BloodStockItem {
  group: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
  units: number
  status: 'Adequate' | 'Available' | 'Low' | 'Critical'
  canDonateTo: string[]
  canReceiveFrom: string[]
  components: {
    prbc: number // Packed Red Blood Cells (Units)
    platelets: number // Platelets Concentrate (Units)
    ffp: number // Fresh Frozen Plasma (Units)
    wholeBlood: number // Whole Blood (Units)
  }
  isUniversalDonor?: boolean
  isUniversalRecipient?: boolean
}

export const INITIAL_BLOOD_STOCK: BloodStockItem[] = [
  {
    group: 'O+',
    units: 18,
    status: 'Adequate',
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
    components: { prbc: 9, platelets: 5, ffp: 3, wholeBlood: 1 },
  },
  {
    group: 'O-',
    units: 3,
    status: 'Critical',
    isUniversalDonor: true,
    canDonateTo: ['All Blood Types (Universal Red Cell Donor)'],
    canReceiveFrom: ['O-'],
    components: { prbc: 2, platelets: 1, ffp: 0, wholeBlood: 0 },
  },
  {
    group: 'A+',
    units: 14,
    status: 'Available',
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    components: { prbc: 7, platelets: 4, ffp: 2, wholeBlood: 1 },
  },
  {
    group: 'A-',
    units: 4,
    status: 'Low',
    canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
    canReceiveFrom: ['A-', 'O-'],
    components: { prbc: 2, platelets: 1, ffp: 1, wholeBlood: 0 },
  },
  {
    group: 'B+',
    units: 21,
    status: 'Adequate',
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    components: { prbc: 11, platelets: 6, ffp: 3, wholeBlood: 1 },
  },
  {
    group: 'B-',
    units: 2,
    status: 'Critical',
    canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
    canReceiveFrom: ['B-', 'O-'],
    components: { prbc: 1, platelets: 1, ffp: 0, wholeBlood: 0 },
  },
  {
    group: 'AB+',
    units: 12,
    status: 'Available',
    isUniversalRecipient: true,
    canDonateTo: ['AB+'],
    canReceiveFrom: ['All Blood Types (Universal Recipient)'],
    components: { prbc: 5, platelets: 4, ffp: 2, wholeBlood: 1 },
  },
  {
    group: 'AB-',
    units: 2,
    status: 'Critical',
    canDonateTo: ['AB+', 'AB-'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    components: { prbc: 1, platelets: 0, ffp: 1, wholeBlood: 0 },
  },
]

export const ELIGIBILITY_CRITERIA = [
  {
    title: 'Age Requirement',
    desc: 'Between 18 and 65 years of age with a valid government photo ID.',
    icon: 'calendar',
  },
  {
    title: 'Body Weight',
    desc: 'Minimum 45 kg for whole blood; minimum 50 kg for platelet apheresis.',
    icon: 'scale',
  },
  {
    title: 'Hemoglobin Count',
    desc: 'At least 12.5 g/dL measured instantly on-site with sterile testing.',
    icon: 'activity',
  },
  {
    title: 'Blood Pressure & Pulse',
    desc: 'BP within 100/60 to 140/90 mm Hg; resting pulse between 60 to 100 bpm.',
    icon: 'heart-pulse',
  },
  {
    title: 'Donation Interval',
    desc: 'Every 90 days (3 months) for men, and every 120 days (4 months) for women.',
    icon: 'clock',
  },
  {
    title: 'General Well-being',
    desc: 'Free from active fever, colds, or antibiotic intake in the last 48 hours.',
    icon: 'shield-check',
  },
]

export const DONATION_STEPS = [
  {
    step: '01',
    title: 'Registration & Mini Health Check',
    desc: 'Quick biometric entry, vitals recording (BP, pulse, weight), and confidential hemoglobin screening by hospital nursing staff.',
  },
  {
    step: '02',
    title: 'Medical Officer Consultation',
    desc: 'A brief confidential check with our transfusion medicine physician to ensure you are 100% fit to donate today.',
  },
  {
    step: '03',
    title: 'Comfortable Donation (8–10 Mins)',
    desc: 'Relax on an automated clinical recliner. Blood collection utilizes single-use, sterile German closed-system blood bags.',
  },
  {
    step: '04',
    title: 'Post-Donation Care & Certificate',
    desc: 'Enjoy energy refreshments, juices, and receive your official Clinica Cure Voluntary Blood Donor Card and Certificate.',
  },
]

export const BLOOD_MYTHS_FACTS = [
  {
    myth: 'Donating blood makes you physically weak or permanently drains your energy.',
    fact: 'Your body replaces fluid volume in 24 to 48 hours and red cells in a few weeks. Most donors return to regular light activities immediately.',
  },
  {
    myth: 'You can contract infections or diseases while donating blood.',
    fact: 'Impossible at Clinica Cure. We use 100% single-use, gamma-sterilized disposable needles and kits that are destroyed right after use.',
  },
  {
    myth: 'People with mild seasonal allergies or past treated illnesses can never donate.',
    fact: 'If you are asymptomatic, fever-free, and not on antibiotics today, you are likely fully eligible after on-site doctor verification.',
  },
  {
    myth: 'Donating blood takes several hours out of your work day.',
    fact: 'The actual blood draw takes only 8 to 10 minutes. The complete visit including check-up, donation, and refreshments takes under 30 minutes.',
  },
]

export const BLOOD_FAQS = [
  {
    q: 'How do family members request urgent blood units from Clinica Cure?',
    a: 'Bring the official Doctor Requisition Form and patient blood sample tube directly to our 24x7 Blood Bank Reception on Ground Floor Bariatu, or call our priority desk at +91 92633 97076 for immediate cross-matching reservation.',
  },
  {
    q: 'Can I donate platelets (Single Donor Platelets - SDP) separately?',
    a: 'Yes. Plateletpheresis allows targeted platelet collection through modern cell separator machines. It takes about 60–75 minutes and can be donated every 2 weeks.',
  },
  {
    q: 'How does Clinica Cure ensure transfused blood safety?',
    a: 'Every unit undergoes mandatory 5-parameter screening (HIV 1 & 2, Hepatitis B, Hepatitis C, Syphilis, and Malaria) via automated advanced testing before release to patients.',
  },
  {
    q: 'What should I do before coming to donate blood?',
    a: 'Hydrate well (drink 500ml water or fruit juice), eat a healthy non-fatty meal 2 hours prior, avoid alcohol for 24 hours, and get a good night sleep.',
  },
]
