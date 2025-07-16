import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'carousel generator app',
  description: 'Created with carugen',
  generator: 'caroge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
