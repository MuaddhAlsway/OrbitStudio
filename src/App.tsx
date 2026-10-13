import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CinematicLoader from './components/cinematic/CinematicLoader'
import Navbar from './components/Navbar'
import ScrollManager from './components/routing/ScrollManager'
import Home from './pages/Home'
import About from './pages/About'
import Process from './pages/Process'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import CaseStudy from './pages/CaseStudy'
import StartProject from './pages/StartProject'
import ProjectBrief from './pages/ProjectBrief'
import NotFound from './pages/NotFound'
import './css/platform.css'

export default function App() {
  return (
    <BrowserRouter>
      <CinematicLoader>
        <ScrollManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/process" element={<Process />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="/start-project/brief" element={<ProjectBrief />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CinematicLoader>
    </BrowserRouter>
  )
}
