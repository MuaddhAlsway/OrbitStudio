import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CinematicLoader from './components/cinematic/CinematicLoader'
import Navbar from './components/Navbar'
import ScrollManager from './components/routing/ScrollManager'
import { RouteTransition } from './motion'
import Home from './pages/Home'
import './css/platform.css'

/* Home stays eager (its hero is the cinematic reveal target); every other
   route is code-split so first paint ships far less JavaScript. */
const About = lazy(() => import('./pages/About'))
const Process = lazy(() => import('./pages/Process'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const StartProject = lazy(() => import('./pages/StartProject'))
const ProjectBrief = lazy(() => import('./pages/ProjectBrief'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <CinematicLoader>
        <ScrollManager />
        <Navbar />
        <RouteTransition>
          <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
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
          </Suspense>
        </RouteTransition>
      </CinematicLoader>
    </BrowserRouter>
  )
}
