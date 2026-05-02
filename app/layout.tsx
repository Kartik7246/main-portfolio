import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Full-Stack & Mobile Engineer',
  description: 'Founder & Lead Engineer at Mercer Studio. Building Next.js web products and Flutter mobile apps for founders and product teams.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
