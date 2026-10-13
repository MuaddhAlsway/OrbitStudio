import { app, initApp } from '../server/app.js'

/* ==================================================================
   Vercel Function entry point.

   Vercel routes any /api/* request here (filesystem catch-all). The
   Express router inside server/app.js owns the individual endpoints,
   so we only need to make sure the path reaches Express with its
   leading /api prefix intact and that the store is initialised once.
   ================================================================== */

export default async function handler(req, res) {
  await initApp()

  const url = req.url || '/api'
  if (!url.startsWith('/api')) {
    req.url = `/api${url.startsWith('/') ? url : `/${url}`}`
  }

  return app(req, res)
}
