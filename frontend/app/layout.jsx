import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Nicotex Clone',
  description: 'Smoking rehabilitation product',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: 20, borderBottom: '1px solid #eee' }}>
          <h1>Nicotex Clone</h1>
        </header>
        <main style={{ padding: 20 }}>{children}</main>
        <footer style={{ padding: 20, borderTop: '1px solid #eee' }}>© Nicotex Clone</footer>
      </body>
    </html>
  )
}
