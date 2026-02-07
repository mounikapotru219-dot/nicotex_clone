import React from 'react'
import Link from 'next/link'

export default async function Home() {
  return (
    <div>
      <h2>Quit smoking with our clinically-approved products</h2>
      <p>Learn about smoking addiction, benefits of quitting, and our product lineup.</p>
      <Link href="/products">View Products</Link>
    </div>
  )
}
