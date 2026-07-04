import Timeline from '../components/Timeline'
import { StoryIntro, CtaBanner } from '../components/Sections'

export default function About() {
  return (
    <main className="page-top">
      <StoryIntro />
      <Timeline />
      <CtaBanner />
    </main>
  )
}
