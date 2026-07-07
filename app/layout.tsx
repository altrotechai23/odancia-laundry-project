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
  metadataBase: new URL("https://odancialaundry.co.za"),

  title: {
    default: "Odancia Laundry | Premium Laundry in Cape Town",
    template: "%s | Odancia Laundry",
  },

  description:
    "Premium laundry, dry cleaning, pickup and delivery services in Cape Town.",

  keywords: [
    "Laundry Cape Town",
    "Dry Cleaning Cape Town",
    "Laundry Pickup Cape Town",
    "Laundry Service Long Street",
  ],

  openGraph: {
    title: "Odancia Laundry",
    description:
      "Premium laundry and dry cleaning services in Cape Town.",
    url: "https://odancialaundry.co.za",
    siteName: "Odancia Laundry",
    locale: "en_ZA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${dmSans.variable} ${titanOne.variable} bg-background`} suppressHydrationWarning>
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
