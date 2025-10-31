'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        router.push('/login')
      } else {
        const data = await res.json();
        console.error(data.message || "An error occurred during signout");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message || "An error occurred during signout");
      } else {
        console.error(String(error) || "An error occurred during signout");
      }
    }
  }

  return (
    <header className="border-b border-warm-gray/20 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-serif text-dark-brown">Journal</h1>
        <button
          onClick={handleSignOut}
          className="text-sm text-warm-gray hover:text-dark-brown transition-colors"
        >
          Sign Out
        </button>
      </div>
    </header>
  )
}
