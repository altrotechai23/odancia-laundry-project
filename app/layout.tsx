import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Archivo_Black, DM_Sans, Titan_One } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BottomTabBar } from '@/components/BottomTabBar'

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const titanOne = Titan_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Odancia Laundry — Premium Laundry & Dry Cleaning in Cape Town',
  description: 'Say goodbye to laundry day! Premium laundry, dry cleaning, and pickup delivery in Cape Town City Centre.',
  openGraph: {
    title: 'Odancia Laundry — Premium Laundry & Dry Cleaning in Cape Town',
    description: 'Say goodbye to laundry day! Premium laundry, dry cleaning, and pickup delivery in Cape Town City Centre.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Odancia Laundry — Premium Laundry & Dry Cleaning in Cape Town',
    description: 'Say goodbye to laundry day! Premium laundry, dry cleaning, and pickup delivery in Cape Town City Centre.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${dmSans.variable} ${titanOne.variable} bg-background`}>
      <body className="font-body antialiased">
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
        <BottomTabBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
