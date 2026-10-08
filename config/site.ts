// Site-wide configuration constants (non-database)
export const siteConfig = {
  name: 'Clinica Cure Hospital',
  tagline: 'Passion For Cure',
  phone: '+91 92633 97076',
  phoneRaw: '+919263397076',
  phoneSecondary: '+91 91031 61328',
  phoneSecondaryRaw: '+919103161328',
  whatsapp: 'https://wa.me/919263397076',
  email: 'care@clinicacure.in',
  address: 'Bariatu Road, Ranchi, Jharkhand - 834009',
  addressShort: 'Bariatu, Ranchi',
  opdHours: '9 AM – 8 PM',
  emergencyHours: '24x7',
  googleRating: '4.8',
  googleReviewCount: '874+',
  mapsUrl: 'https://maps.google.com/?q=CLINICA+CURE+HOSPITAL+Bariatu+Ranchi',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.6353647105734!2d85.3576235!3d23.401404900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e3afc86c38ab%3A0xa9b1e80f0cd5ffa6!2sCLINICA%20CURE%20HOSPITAL!5e0!3m2!1sen!2sin!4v1791453773176!5m2!1sen!2sin',
  logoUrl: '/images/icons/favicon-clinicacure.webp',
  blogUrl: '/blog',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clinicacure.in',
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    whatsapp: 'https://wa.me/919263397076',
  },
}

export type SiteConfig = typeof siteConfig
