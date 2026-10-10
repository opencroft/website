import { createFileRoute } from '@tanstack/react-router'

import { CTA } from '@/components/sections/cta'
import { Features } from '@/components/sections/features'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Navbar } from '@/components/sections/navbar'
import { OpenSource } from '@/components/sections/open-source'
import { Showcase } from '@/components/sections/showcase'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className='min-h-screen bg-bg-primary text-text-primary'>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Showcase />
        <OpenSource />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
