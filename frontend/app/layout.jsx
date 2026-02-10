import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MAR Mouth Chill | Smokefree Life Starts Here',
  description: 'Premium smoking rehabilitation products and support.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/images/logos/logo.jpeg" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
