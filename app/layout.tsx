import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Clinica Cure Hospital - Advanced Multi-Speciality Healthcare in Ranchi',
    template: '%s | Clinica Cure Hospital',
  },
  description:
    'Clinica Cure Hospital, Bariatu, Ranchi - a multi-speciality hospital offering 24x7 emergency care, experienced specialists and modern medical facilities.',
  keywords: [
    'Clinica Cure Hospital',
    'hospital in Ranchi',
    'multi-speciality hospital Ranchi',
    'doctor Ranchi',
    'emergency care Ranchi',
    'Bariatu hospital',
    'Jharkhand hospital',
  ],
  authors: [{ name: 'Clinica Cure Hospital' }],
  creator: 'Clinica Cure Hospital',
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: 'Clinica Cure Hospital — Advanced Multi-Speciality Healthcare in Ranchi',
    description:
      'Clinica Cure Hospital, Bariatu, Ranchi — a multi-speciality hospital offering 24x7 emergency care, experienced specialists and modern medical facilities.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinica Cure Hospital — Advanced Multi-Speciality Healthcare in Ranchi',
    description:
      'Clinica Cure Hospital, Bariatu, Ranchi — a multi-speciality hospital offering 24x7 emergency care.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/images/icons/favicon-clinicacure.webp', type: 'image/webp' },
    ],
    shortcut: '/images/icons/favicon-clinicacure.webp',
    apple: '/images/icons/favicon-clinicacure.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="bg-white text-body antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  )
}
