"use client"
import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('./Admin'), { ssr: false }) as any

function page() {
  return (
    <div><AdminPanel/></div>
  )
}

export default page