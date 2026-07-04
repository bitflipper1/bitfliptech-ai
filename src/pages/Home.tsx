import Hero from '../components/Hero'
import CapabilityMap from '../components/CapabilityMap'
import { Services, Process, CtaBanner } from '../components/Sections'

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Services />
        <CapabilityMap />
        <Process />
        <CtaBanner />
      </main>
    </>
  )
}
