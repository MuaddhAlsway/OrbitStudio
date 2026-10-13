import Hero from '../components/Hero'
import Expertise from '../components/Expertise'
import SelectedWork from '../components/SelectedWork'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <Expertise />
      <SelectedWork />
      <Contact />
    </main>
  )
}
