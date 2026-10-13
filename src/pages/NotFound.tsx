import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found', 'The page you are looking for could not be found.')

  return (
    <main className="nf" id="not-found">
      <div className="nf__bg" aria-hidden="true">
        <div className="nf__grid" />
      </div>
      <div className="nf__inner">
        <p className="nf__eyebrow">Error 404</p>
        <h1 className="nf__title">
          This page isn&rsquo;t part of the
          <span className="nf__title-strong"> system</span>.
        </h1>
        <p className="nf__text">
          The page you were looking for may have moved, or the address may be incorrect.
        </p>
        <div className="nf__actions">
          <Link className="svc-btn svc-btn--primary" to="/">
            Back to Home
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
              <path
                d="M4.75 11.25 11.25 4.75M6 4.75h5.25V10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link className="svc-btn svc-btn--ghost" to="/services">
            View Services
          </Link>
        </div>
      </div>
    </main>
  )
}
