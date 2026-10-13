import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { getWhatsAppUrl } from '../config/whatsapp'
import '../css/Footer.css'

const STUDIO_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/#contact' },
]

const YEAR = new Date().getFullYear()

function BrandSymbol() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6.75 20.25v-8.5a5.25 5.25 0 0 1 10.5 0v8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3.75 20.25h16.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ArrowNe() {
  return (
    <svg viewBox="0 0 16 16" width={15} height={15} fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl()

  return (
    <footer className="ft" aria-labelledby="ft-heading">
      <div className="ft__bg" aria-hidden="true">
        <div className="ft__grid" />
      </div>

      <div className="ft__inner">
        <div className="ft__top">
          <div className="ft__brand">
            <Link className="ft__brand-link" to="/" aria-label="Orbit Studio — home">
              <span className="ft__mark">
                <BrandSymbol />
              </span>
              <span className="ft__wordmark">Orbit Studio</span>
            </Link>
            <p className="ft__tagline" id="ft-heading">
              We design and engineer digital products, intelligent platforms, and scalable
              software for ambitious businesses.
            </p>
            <Link className="ft__cta" to="/start-project">
              <span>Start a project</span>
              <ArrowNe />
            </Link>
          </div>

          <nav className="ft__cols" aria-label="Footer">
            <div className="ft__col">
              <h2 className="ft__col-title">Studio</h2>
              <ul className="ft__list" role="list">
                {STUDIO_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link className="ft__link" to={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft__col">
              <h2 className="ft__col-title">Services</h2>
              <ul className="ft__list" role="list">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link className="ft__link" to={`/services/${service.slug}`}>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft__col">
              <h2 className="ft__col-title">Connect</h2>
              <ul className="ft__list" role="list">
                <li>
                  <a className="ft__link" href="mailto:hello@manara.sa">
                    hello@manara.sa
                  </a>
                </li>
                {whatsappUrl && (
                  <li>
                    <a
                      className="ft__link"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li>
                  <span className="ft__link ft__link--static">Riyadh, Saudi Arabia</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="ft__bottom">
          <p className="ft__copy">&copy; {YEAR} Orbit Studio. All rights reserved.</p>
          <p className="ft__meta">Riyadh &mdash; 24.71&deg;N / 46.67&deg;E</p>
        </div>
      </div>
    </footer>
  )
}
