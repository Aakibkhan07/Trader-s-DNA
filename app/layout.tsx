import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata: Metadata = {
  title: "Trader's DNA - AI Behavioral Intelligence Platform",
  description: 'Upload trade screenshots and uncover emotional patterns, discipline weaknesses, risk behaviors, and hidden habits affecting your trading performance.',
  keywords: ['trading', 'AI', 'psychology', 'behavioral analysis', 'trading psychology', 'trading platform'],
  authors: [{ name: 'Trade Metrix Technologies' }],
  openGraph: {
    title: "Trader's DNA - Where Psychology Meets Precision",
    description: "The world's most premium AI behavioral intelligence platform for traders.",
    type: 'website',
    locale: 'en_US',
    siteName: "Trader's DNA",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trader's DNA - AI Behavioral Intelligence Platform",
    description: 'Upload trade screenshots and uncover your trading DNA.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}