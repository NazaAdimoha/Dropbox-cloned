import Image from 'next/image'
import Dashboard from './dashboard/page'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <main className='px-32 py-10'>
      <UserButton 
        afterSignOutUrl="/"
      />
      <Dashboard />
    </main>
  )
}
