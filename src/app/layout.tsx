import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My.CV.Gen - AI Powered CV Generator',
  description: 'Create professional, customizable CVs with AI in minutes. Choose from templates, customize every detail, and export to PDF.',
  keywords: ['CV', 'resume', 'AI', 'resume builder', 'CV generator', 'professional'],
  openGraph: {
    title: 'My.CV.Gen - AI Powered CV Generator',
    description: 'Create professional, customizable CVs with AI in minutes.',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
