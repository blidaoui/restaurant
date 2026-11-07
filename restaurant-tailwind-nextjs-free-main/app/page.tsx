"use client"
import dynamic from 'next/dynamic';
import Banner from './components/Banner/index';
import Features from './components/Work/index';

const Map = dynamic(() => import('./components/map/page'), { ssr: false }) as any;



export default function Home() {
  return (
    <main id="home-section" >
      <Banner />
      <Features />
      <Map />
     
    </main>
  )
}
