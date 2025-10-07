import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Super Deep Research',
  description: 'From question to verifiable structured intelligence.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
