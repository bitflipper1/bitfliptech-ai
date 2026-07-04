import Timeline from '../components/Timeline'
import WorkCollage from '../components/WorkCollage'
import { StoryIntro, CtaBanner } from '../components/Sections'

export default function About() {
  return (
    <main className="page-top">
      <StoryIntro />
      <WorkCollage />
      <Timeline />
      <CtaBanner />
    </main>
  )
}
